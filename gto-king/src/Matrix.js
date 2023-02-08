import React, { useState } from 'react';
import Cell from './Cell';
import Header from './Header';
import './matrix.css'

function Matrix(props) {

    return (
        <>
        <Header />
        <div className='matrixCol item'>
        {
            props.matrix.map((col,x)=>{
                return(
                    <div className='matrixRow'>
                        {
                            col.map((row,y)=>{
                                return (
                                    <Cell x={x} y={y} key={x+y} matrix={props.matrix} update={props.setMatrix} active={props.matrix[x][y]} />
                                )
                            })
                        }
                    </div>
                )}
            )
        }
        </div>
        </>

    );
}


export default Matrix;
