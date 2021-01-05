import React from 'react';

function Select(props) {
    return (
        <select name="answer" id={"answer_"+props.id}>
            <option value="-">-</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
        </select>
    );
}


       
export default Select;
