import './card.css';
import suit from './clubs.svg';

function Club(props) {
    return (
        <div className="card clubs">
        <div className="card-value">
        {props.value}
        </div>
        <img src = {suit} alt={"My Happy SVG"} className={'svg'}/>
    </div>
    );
}
  
export default Club;
  