import PropTypes from 'prop-types';

const OrderCard = ({ order }) => {
  if (!order) {
    return <p>No order details available</p>;
  }

  return (
    <div style={styles.card}>
      <h2>Order #{order.id}</h2>
      <p>Pickup: {order.pickupAddress}</p>
      <p>Delivery: {order.deliveryAddress}</p>
      <p>Status: {order.status}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px 0',
    backgroundColor: '#f9f9f9',
  },
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    pickupAddress: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
};

export default OrderCard;
