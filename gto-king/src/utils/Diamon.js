import './card.css';
import suit from './diamond.svg';

function Diamond(props) {
    return (
        <div class="card diamond">
        <div class="card-value">
            {props.value}
        </div>
        <img src = {suit} alt={"My Happy SVG"} className={'svg'}/>
    </div>
    );
}
  
export default Diamond;
  