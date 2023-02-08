import './card.css';
import suit from './clubs.svg';

function Club(props) {
    return (
        <div class="card clubs">
        <div class="card-value">
        {props.value}
        </div>
        <img src = {suit} alt={"My Happy SVG"} className={'svg'}/>
    </div>
    );
}
  
export default Club;
  