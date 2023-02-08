import Clover from "./Clover"
import Club from "./Club"
import Diamond from "./Diamon"
import Heart from "./Heart"

const resolveCardText = (x,y)=>{
    let obj = []
    obj[0] = resolveCardValue(x < y ? x : y)
    obj[1] = resolveCardValue(x > y ? x : y)
    obj[2] = x > y ? 'o' : x < y ? 's' : ''
    return obj
}

const resolveCardValue = (x)=>{
    if (x>4)
        return 14-x;
    else {
        switch (x) {
            case 4:
                return 'T'
            case 3:
                return 'J'
            case 2:
                return 'Q'
            case 1:
                return 'K'
            case 0:
                return 'A'
            default:
                break;
        }
    }
}

const resolveCardSuit = (x) => {
    switch (x) {
        case 0:
            return 'd'
            break;
        case 1:
            return 'h'
            break;
        case 2:
            return 'c'
            break;
        case 3:
            return 's'
            break;   
        default:
            break;
    }
}

const getCardComponent = (v,s) =>{
    switch (s) {
        case 'd':
            return <Diamond value={v} />
        case 'h':
            return <Heart value={v} />    
        case 'c':
            return <Club value={v} />
        case 's':
            return <Clover value={v} />
        default:
            break;
    }
}

const getRandomTuple = (n=1) => {
    let tuple = Array(n);
    let arr = tuple.fill().map(()=>({v:Math.floor(Math.random()*13), s: Math.floor(Math.random()*4)}))
    let isDuplicate = arr.some(function(item, idx){ 
        return arr.indexOf(item) != idx 
    });
    if ( isDuplicate){
        arr[isDuplicate].v++
        arr[isDuplicate]%=13
    }
    return tuple.fill().map(()=>({v:Math.floor(Math.random()*13), s: Math.floor(Math.random()*4)}))
}


export { resolveCardText as resolveCardText, resolveCardValue as resolveCardValue, getRandomTuple as getRandomTuple, resolveCardSuit as resolveCardSuit, getCardComponent as getCardComponent }