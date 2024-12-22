import { useEffect, useState } from "react";

export default function RequestList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch orders from the backend API
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-primary">Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border p-4 rounded-md shadow-sm">
              <p>
                <strong>Item Name:</strong> {order.itemName}
              </p>
              <p>
                <strong>Pickup Address:</strong> {order.pickupAddress}
              </p>
              <p>
                <strong>Drop Address:</strong> {order.dropAddress}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}