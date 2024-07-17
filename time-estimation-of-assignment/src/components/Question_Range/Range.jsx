import React from 'react';

const Range = ({option}) => {
    return(
        <div>
            <label>
                {option.text} Confidence :
                <input type="range" min="0" max="1" step="0.1"/>
            </label>
        </div>
    )
}
export default Range;