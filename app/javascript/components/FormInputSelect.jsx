import React from "react";

export const FormInputSelect = ({fieldId,fieldName,fieldValue,fieldOptions,label,hint,handleChange,handleBlur,errorMsg}) => {
    return (
        <>
            <div
                className={errorMsg && "field_with_errors"}
            >
                {label && <label htmlFor={fieldId}>{label}:</label>}
                <select
                    id={fieldId}
                    name={fieldName}
                    value={fieldValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                >
                    {fieldOptions.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </select>
                {hint && <span className="hint">{hint}</span>}
                {errorMsg && <span className="error">{errorMsg}</span>}
            </div>
        </>
    )
}
