//
//
// Handle client-side WebAuthn authentication (passkey).
//
// Make sure you put this in application.js:
//
//     import Passkey from '@commoncore/webauthn_passkey.js';
//     Passkey.setup();
//
//

import * as webauthn from "@github/webauthn-json";
import {fetchFromApp} from "@commoncore/fetch_from_app.js"

//
//
// Config with backward‑compatible defaults
//
//
const config = {
    // Path prefix; matches current behavior
    registrationUrl: "/feapi/webauthn/registration",
    authenticationUrl: "/feapi/webauthn/authentication",

    // Element IDs; match current behavior
    registerFormId: "register-passkey-form",
    loginButtonId: "passkey-login-button",

    // Optional: redirect URL after successful authentication
    redirectAfterAuthPath: "/redirect_after_auth",
};

////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
// WebAuthn Registration Flow
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////
export async function registerPasskey(nickname) {
    const options = await fetchFromApp(config.registrationUrl,{},1);
    const credential = await webauthn.create({publicKey: options.publicKey});
    await fetchFromApp(config.registrationUrl, {
        method: "POST",
        csrf: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential, nickname })
    },1);
}
function setup_registration(){
    if(config.registerFormId === ''){
        console.log("Passkey registration form ID not set; skipping registration setup.");
        return;
    }
    const regForm = document.getElementById(config.registerFormId);
    if (regForm) {
        regForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const nickname = document.getElementById("nickname").value;
            try {
                await registerPasskey(nickname);
                // alert("Passkey registered!");
                window.location.reload();
            } catch (err) {
                alert("Passkey registration failed: " + err.message);
            }
        });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
// WebAuthn Authentication Flow
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////
export async function authenticatePasskey() {
    const options = await fetchFromApp(config.authenticationUrl,{},1);
    const credential = await webauthn.get(options);
    await fetchFromApp(config.authenticationUrl, {
        method: "POST",
        csrf: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential })
    });

    return true;
}
function setup_authentication(){
    if(config.loginButtonId === ''){
        console.log("Passkey login form ID not set; skipping login setup.");
        return;
    }
    const passkeyButton = document.getElementById(config.loginButtonId);
    if (passkeyButton) {
        passkeyButton.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                await authenticatePasskey();
                window.location.href = config.redirectAfterAuthPath;
            } catch (err) {
                console.log(err);
                alert("Passkey Login Failed. Is it set up properly?\nGo to Settings->Credentials to set it up.");
            }
        });
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
// Global Setup
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////
function setup(options = {}) {
    console.log(" Passkey.setup: options=", options);

    // Merge options into config while keeping defaults for unspecified fields
    if (options.registrationUrl) config.registrationUrl = options.registrationUrl;
    if (options.authenticationUrl) config.authenticationUrl = options.authenticationUrl;
    if (options.registerFormId) config.registerFormId = options.registerFormId;
    if (options.loginButtonId) config.loginButtonId = options.loginButtonId;
    if (options.redirectAfterAuthPath !== undefined) {
        config.redirectAfterAuthPath = options.redirectAfterAuthPath;
    }

    console.log("WebAuthn Passkey setup: config=", config);

    document.addEventListener("DOMContentLoaded", () => {
        setup_registration();
        setup_authentication();
    });
}

export default {
    setup,
    registerPasskey,
    authenticatePasskey,
};
