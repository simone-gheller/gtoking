import './card.css';
import suit from './clovers.svg';

function Clover(props) {
    return (
        <div class="card clovers">
        <div class="card-value">
        {props.value}
        </div>
        <img src = {suit} alt={"My Happy SVG"} className={'svg'}/>
    </div>
    );
}
  
export default Clover;
  