import React from "react";

export const FormatInputText = ({fieldId,fieldName,fieldValue,label,hint,handleChange,errorMsg}) => {
    return (
        <>
            <div
                className={errorMsg && "field_with_errors"}
            >
                {label && <label htmlFor={fieldId}>{label}:</label>}
                <input
                    type="text"
                    id={fieldId}
                    name={fieldName}
                    value={fieldValue}
                    onChange={handleChange}
                />
                {hint && <span className="hint">{hint}</span>}
                {errorMsg && <span className="error">{errorMsg}</span>}
            </div>
        </>
    )
}
