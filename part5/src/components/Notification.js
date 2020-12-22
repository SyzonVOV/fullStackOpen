import PropTypes from 'prop-types';

const Notification = ({ message }) => {
  const errorStyle = {
    color: 'red',
  };

  const normalStyle = {
    color: 'green',
  };

  if (message === null) {
    return null;
  }

  return (
    <div id="message" className="modal">
      <div className="modal-message" style={message.event === 'error' ? errorStyle : normalStyle}>
        {message.message}
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.object,
};

export default Notification;
