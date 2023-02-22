import { useState } from 'react';
import './matrix.css';
import { resolveCardText } from './utils/cards';

function Cell(props) {

    const toggle = () => {
        let arr = [...props.matrix]
        if(props.matrix[props.x][props.y]==0){
            arr[props.x][props.y] = 1
        }
        else{
            arr[props.x][props.y] = 0
        }
        props.update(props.x, arr[props.x], arr)
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