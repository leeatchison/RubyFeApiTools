import React from "react";

export const FormatInputBoolean = ({fieldId,fieldName,fieldValue,label,hint,handleChange,handleBlur,errorMsg}) => {
    return (
        <>
            <div
                className={errorMsg && "field_with_errors"}
            >
                <input
                    type="checkbox"
                    id={fieldId}
                    name={fieldName}
                    checked={fieldValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {label && <label style={{display:"inline"}} htmlFor={fieldId}>{label}</label>}
                {hint && <span className="hint">{hint}</span>}
                {errorMsg && <span className="error">{errorMsg}</span>}
            </div>
        </>
    )
}
