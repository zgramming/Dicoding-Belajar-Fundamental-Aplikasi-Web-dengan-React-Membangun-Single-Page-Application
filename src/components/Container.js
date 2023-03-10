import PropTypes from "prop-types";

const Container = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col gap-5 py-5 mx-auto 2xl:max-w-4xl ${className}`}
    >
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Container;
