import './card.css';
import suit from './diamond.svg';

function Diamond(props) {
    return (
        <div className="card diamond">
            <div className="card-value">
                {props.value}
            </div>
            <img src = {suit} alt={"My Happy SVG"} className={'svg'}/>
        </div>
    );
}
  
export default Diamond;
  