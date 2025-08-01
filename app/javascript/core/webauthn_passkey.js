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

////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
// WebAuthn Registration Flow
//
//
////////////////////////////////////////////////////////////////////////////////////////////////////
export async function registerPasskey(nickname) {
    const options = await fetchFromApp("/feapi/webauthn/registration",{},1);
    const credential = await webauthn.create({publicKey: options.publicKey});
    await fetchFromApp("/feapi/webauthn/registration", {
        method: "POST",
        csrf: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential, nickname })
    },1);
}
function setup_registration(){
    const regForm = document.getElementById("register-passkey-form");
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
    const options = await fetchFromApp('/feapi/webauthn/authentication',{},1);
    const credential = await webauthn.get(options);
    await fetchFromApp("/feapi/webauthn/authentication", {
        method: "POST",
        csrf: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential })
    });

    return true;
}
function setup_authentication(){
    const passkeyButton = document.getElementById("passkey-login-button");
    if (passkeyButton) {
        passkeyButton.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                await authenticatePasskey();
                window.location.href = "/redirect_after_auth";
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
function setup(){
    document.addEventListener("DOMContentLoaded", () => {
        setup_registration();
        setup_authentication();
    });
}
export default {
    setup
};
