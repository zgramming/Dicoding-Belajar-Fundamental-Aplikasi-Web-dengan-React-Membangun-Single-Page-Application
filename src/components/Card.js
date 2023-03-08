import PropTypes from "prop-types";

const Card = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col gap-2 bg-white rounded-md shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
export default Card;
