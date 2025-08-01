import React, { useState } from 'react';
//
//
// <EditableDate
//     initialValue="2024-03-20"
//     onValueUpdate={(newValue) => console.log(newValue)}
// />
//
//
// <EditableDate
//     initialValue="2024-03-20T14:30"
//     onValueUpdate={(newValue) => console.log(newValue)}
//     includeTime={true}
//     emptyLabel={'n/a'}
// />
//
//
const EditableDate = ({
                          initialValue,
                          onValueUpdate,
                          includeTime = false,
                          emptyLabel = 'n/a',
                          displayFormatter = (value) => {
                              if (!value) return '';
                              const date = new Date(value);
                              let ret = '';
                              if (includeTime) {
                                  ret = (new Date(date.getTime() + (date.getTimezoneOffset() * 60000))).toLocaleString();
                              }else{
                                  ret = (new Date(date.getTime() + (date.getTimezoneOffset() * 60000))).toLocaleDateString();
                              }
                              return ret
                          }
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

    // Format date value for input element
    const getInputValue = () => {
        if (!value) return '';
        const date = new Date(value);

        if (includeTime) {
            // Format: YYYY-MM-DDThh:mm
            return date.toISOString().slice(0, 16);
        }
        // Format: YYYY-MM-DD
        return date.toISOString().slice(0, 10);
    };

    if (isEditing) {
        return (
            <input
                type={includeTime ? "datetime-local" : "date"}
                value={getInputValue()}
                onChange={handleChange}
                autoFocus
                onBlur={() => setIsEditing(false)}
            />
        );
    }
    if(!value){
        return (<span onClick={handleClick}>{emptyLabel}</span>);
    }

    return (<span onClick={handleClick}>{displayFormatter(value)}</span>);
};

export default EditableDate;