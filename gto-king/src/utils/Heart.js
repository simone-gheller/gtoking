import './card.css';
import suit from './heart.svg';

function Heart(props) {
    return (
        <div className="card heart">
        <div className="card-value">
            {props.value}
        </div>
        <img src = {suit} alt={"My Happy SVG"} className={'svg'}/>
    </div>
    );
}
  
export default Heart;
  