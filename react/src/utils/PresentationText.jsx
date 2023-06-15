import PropTypes from 'prop-types';

function PresentationText(props) {
  const { title, content } = props;

  return (
    <div className="presentation-text shadow p-4">
      <h2 className="presentation-text__title">{title}</h2>
      <p className="presentation-text__content">{content}</p>
    </div>
  );
}

PresentationText.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default PresentationText;
