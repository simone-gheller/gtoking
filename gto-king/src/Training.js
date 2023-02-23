import { useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Header from "./Header";
import PreflopTrivia from "./PreflopTrivia";
import success from "./utils/tick.png"
import fail from "./utils/cross.png"
import './training.css'
import './header.css'
import './matrix.css'

function Training() {

    const [totHands, setTotHands] = useState(0)
    const [totHandsCorrect, setTotHandsCorrect] = useState(0)

    return (
        <>
            <Header />
            <div className="training">
                <div class="hamburger-menu">
                    <input id="menu__toggle" type="checkbox" />
                    <label class="menu__btn" for="menu__toggle">
                        <span></span>
                    </label>
                    <div class="statistics">
                        <div class="menu__box">
                            <h3>STATISTICS</h3>
                            <div className="scoreMenu">
                                <div>
                                    <div className="scoreLabel">HANDS</div>
                                    <div className="scoreNumber">{totHands}</div>
                                </div>
                                <div>
                                    <div className="scoreLabel">SCORE</div>
                                    <div className="scoreNumber">{totHands==0?0:Math.round(totHandsCorrect*100/totHands)}%</div>
                                </div>
                            </div>
                            <div className="bars">
                                <div className="bar">
                                    <img src={success} className="successPG" />
                                    <div className="barLabel">{totHandsCorrect}</div>
                                    <ProgressBar variant="custom" now={totHands==0?0:Math.round(totHandsCorrect*100/totHands)} />
                                </div>
                                <div className="bar">
                                    <img src={fail} className="successPG" />
                                    <div className="barLabel">{totHands - totHandsCorrect}</div>
                                    <ProgressBar variant="danger" now={totHands==0?0:Math.round((totHands - totHandsCorrect)*100/totHands)} />
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='rangeselection'>
                    <div className="trivia">
                    {
                        <PreflopTrivia increaseHandsNumber={()=>{setTotHands(hands=>hands+1)}} increaseCorrectHandsN={()=>{setTotHandsCorrect(hands=>hands+1)}} /> 
                    }
                    </div>
                </div>
            </div>

        </>
    );
  }
  
  export default Training;
  