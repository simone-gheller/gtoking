import { useEffect, useState } from "react";
import { getCardComponent, getRandomTuple, resolveCardSuit, resolveCardText, resolveCardValue } from "./utils/cards";
import { getRange } from './api';
import {AnimatePresence, motion} from "framer-motion"
import './training.css'
import success from "./utils/tick.png"
import fail from "./utils/cross.png"
import fire from "./utils/fire.png"
import ff from "./utils/fastforward.png"

const slideIn = {
    hidden:{
        x: "50vh",
        opacity: 0
    },
    visible:{
        x: "0",
        opacity: 1
    },
    exit:{
        x: "-40vh",
        opacity: 0
    }
}

function PreflopTrivia(props) {

    const [holes, setHoles] = useState(getRandomTuple(2))
    const [answer, setAnswer] = useState(null)
    const [score, setScore] = useState(null)
    const [scoreView, setScoreView] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [spree, setSpree] = useState(0)
    const [matrix, setMatrix] = useState(null)

    useEffect(()=>{
        if(score!=null)
            score && refreshHand()
    },[score])

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

    const refreshHand = () => {
        setHoles(getRandomTuple(2))
        setScore(null)
        // setAnswer(null)
    }

    const resolveAnswer = (ans) => {
        setShowResult(true)
        let result
        result = matrix[holes[0].v][holes[1].v] == ans
        console.log(result)
        if(result)
            setSpree(spree=>spree+1)
        else
            setSpree(0)
        console.log('answer', ans)
        setAnswer(ans)
        setScore(result)
        setScoreView(result)
        setTimeout(()=>{
            setShowResult(false)
        },1300)

    }

    return (
        <>
            <div className="hand">
                {
                    getCardComponent(resolveCardValue(holes[0].v),resolveCardSuit(holes[0].s))
                }
                {
                    getCardComponent(resolveCardValue(holes[1].v),resolveCardSuit(holes[1].s))
                }
            </div>
            <div className="block">
            <AnimatePresence>
                    {
                    showResult &&
                    <div className="scoreFlex">
                        <motion.div className="score"
                        key="card"
                        variants={slideIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        >

                            <img src={scoreView?success:fail} className="scoreIcon"/>
                            <p className="answerParagraph">{answer?'RAISE':'FOLD'}</p>
                        </motion.div>
                        
                        {
                            scoreView && 
                            <motion.div className="score"
                            key="spree"
                            variants={slideIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            >
    
                                <img src={fire} className="scoreIcon"/>
                                <p className="answerParagraph">X{spree}</p>
                            </motion.div>
                        }

                    </div>   
                    }
                </AnimatePresence>
            </div>
            <div className="buttonGroup">
                <button onClick={()=>{resolveAnswer(false)}} className={`answer ${score===false?'errorCard':'fold'}`} disabled={score===false}>
                    {score===false &&
                        <img src={answer===false?fail:success} className="scoreIcon" />
                    }
                    <p className="btnTitle" >FOLD</p>
                </button>
                <button onClick={()=>{resolveAnswer(true)}} className={`answer ${score===false?'errorCard':'raise'}`} disabled={score===false}>
                    {score===false &&
                        <img src={answer===true?fail:success} className="scoreIcon" />
                    }
                <p className="btnTitle" >RAISE</p> 
                </button>
                <button onClick={()=>{resolveAnswer(true)}} className={`answer ${score===false?'errorCard':'allin'}`} disabled={score===false}>
                    {score===false &&
                        <img src={answer===true?fail:success} className="scoreIcon" />
                    }
                <p className="btnTitle" >ALLIN</p> 
                </button>
            </div>
            <div className="flexBtn">
            {
                score===false &&
                <button onClick={refreshHand} className="answer refresh">
                    NEXT HAND
                    <img src={ff} className="ff" />    
                </button>
            }
            </div>

            
        </>   
    );
}
  
export default PreflopTrivia;
  