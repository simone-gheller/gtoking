import {useState, useEffect, useRef} from "react";
import Matrix from "./Matrix";
import Training from "./Training";
import DropdownItem from "./DropdownItem";
import Header from "./Header";
import './matrix.css'
import './training.css'


function TrainingView() {

    const [view, setView] = useState('ranges')
    const [matrix, setMatrix] = useState(Array(13).fill().map(()=>Array(13).fill(0)))
    const [position, setPosition] = useState(0)

    return (
        <div>
            {view==='ranges' &&
                <h3> Select your range below</h3>
            }
            <div className='rangeselection'>
                <div className="trivia">
                {
                    view==='ranges'? <Matrix matrix={matrix} setMatrix={setMatrix} /> : <Training matrix={matrix} />
                }
                </div>
            </div>
        </div>   
    );
  }
  
  export default TrainingView;
  