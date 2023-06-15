
import { PropTypes } from 'prop-types';

function Card({title, image, content, link}){

    return(
        <div className="col-md-6 col-lg-3 col-sm-12" >
        <div className="card">
  <img src={image} className="card-img-top" alt={title}/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{content}</p>
    <a href={link} className="btn btn-primary">Voir +</a>
  </div>
</div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  };

  export default Card;