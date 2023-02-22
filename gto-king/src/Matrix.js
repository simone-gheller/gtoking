import React, { useState, useEffect } from 'react';
import { getRange, updateRangeRow } from './api';
import { Alert } from 'react-bootstrap'
import Cell from './Cell';
import Header from './Header';
import './matrix.css'

function Matrix() {

    const [matrix, setMatrix] = useState(null)
    const [error, setError] = useState('')

    useEffect(()=>{
        const getRangeFromServer = async () =>{
            try {
                const range = await getRange()
                console.log(range)
                setMatrix(range)
            } catch (error) {
                console.log(error)
            }
        }
        getRangeFromServer();
      },[])

    const updateCell = async (rowNumber, row, arr)=>{
        const result = await updateRangeRow(rowNumber, row)
        if(!result){
            setError("error updating DB")
        }
        else{
            setMatrix(arr)
        }
    }

    return (
        <>
        <Header />
        {
            error &&
            <Alert variant='danger' onClose={()=>setError('')} dismissible>
                {error}
            </Alert>
        }
        <div className='matrixCol item'>
        {
            matrix &&
            matrix.map((col,x)=>{
                return(
                    <div className='matrixRow' key={col+x}>
                        {
                            col.map((row,y)=>{
                                return (
                                    <Cell x={x} y={y} key={x+y} matrix={matrix} update={updateCell} active={matrix[x][y]} />
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
