import { useState } from 'react';
import './matrix.css';
import { resolveCardText } from './utils/cards';

function Cell(props) {

    const toggle = () => {
        let arr = [...props.matrix]
        arr[props.x][props.y]= !props.matrix[props.x][props.y]
        props.update(arr)
        console.log(props.matrix)
    }

    return (
        <div className={`cell ${props.active==1 ? 'selected' : null}`}
            onClick={toggle}>
                {resolveCardText(props.x, props.y)}
        </div>
    );
}

export default Cell;