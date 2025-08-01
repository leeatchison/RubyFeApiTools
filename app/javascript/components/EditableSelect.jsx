import React, { useState } from 'react';

const EditableSelect = ({
                            initialValue,
                            options,
                            onValueUpdate,
                            displayFormatter = (value) => value // Optional formatter for display text
                        }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onValueUpdate(newValue);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <select
                value={value}
                onChange={handleChange}
                autoFocus
                onBlur={() => setIsEditing(false)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        );
    }

    return (
        <span onClick={handleClick}>
      {displayFormatter(value)}
    </span>
    );
};

export default EditableSelect;