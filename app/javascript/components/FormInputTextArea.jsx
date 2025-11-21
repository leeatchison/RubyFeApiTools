import React from "react";

export const FormatInputTextArea = ({fieldId,fieldName,fieldValue,label,hint,handleChange,handleBlur,errorMsg, rows=5}) => {
    return (
        <>
            <div
                className={errorMsg && "field_with_errors"}
            >
                {label && <label htmlFor={fieldId}>{label}:</label>}
                <textarea
                    id={fieldId}
                    name={fieldName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={fieldValue}
                    rows={rows}
                ></textarea>
                {hint && <span className="hint">{hint}</span>}
                {errorMsg && <span className="error">{errorMsg}</span>}
            </div>
        </>
    )
}
