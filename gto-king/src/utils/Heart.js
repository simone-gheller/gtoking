import './card.css';
import suit from './heart.svg';

function Heart(props) {
    return (
        <div class="card heart">
        <div class="card-value">
            {props.value}
        </div>
        <img src = {suit} alt={"My Happy SVG"} className={'svg'}/>
    </div>
    );
}
  
export default Heart;
  