import React, { useState } from 'react';

const EditableText = ({ initialText, onTextUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialText);
    const [tempText, setTempText] = useState(initialText);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        setText(tempText);
        onTextUpdate(tempText);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setTempText(e.target.value);
    };

    if (isEditing) {
        return (
            <div style={{whiteSpace: "nowrap"}}>
                <input
                    type="text"
                    value={tempText}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
                <button onClick={handleSubmit}>Set</button>
            </div>
        );
    }

    return <span onClick={handleClick}>{text}</span>;
};

export default EditableText;