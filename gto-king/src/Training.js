import { useState } from "react";
import Header from "./Header";
import PreflopTrivia from "./PreflopTrivia";
import './training.css'
import './header.css'
import './matrix.css'

function Training(props) {

    return (
        <>
            <Header />
            <div className='rangeselection'>
                <div className="trivia">
                {
                    <PreflopTrivia matrix={props.matrix} /> 
                }
                </div>
            </div>

        </>
    );
  }
  
  export default Training;
  