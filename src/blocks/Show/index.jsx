import PropTypes from 'prop-types';

export const Show = ({ iff, children }) => {
  if (iff) {
    return <>{children}</>;
  }
  
  return null;
};

Show.propTypes = {
  iff: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}