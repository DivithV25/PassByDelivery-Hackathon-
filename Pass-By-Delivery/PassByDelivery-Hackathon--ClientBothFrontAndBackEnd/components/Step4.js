export default function Step4({ formData, onSubmit }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", formData); // Debug
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Order submitted successfully!");
        onSubmit(); // Reset the form and go back to Step 1
      } else {
        alert("Failed to submit order. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("An error occurred while submitting the order.");
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4 text-primary">Step 4: Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p>
            <strong>Item Name:</strong> {formData.itemName}
          </p>
          <p>
            <strong>Item Details:</strong> {formData.itemDetails}
          </p>
          <p>
            <strong>Pickup Address:</strong> {formData.pickupAddress}
          </p>
          <p>
            <strong>Drop Address:</strong> {formData.dropAddress}
          </p>
          <p>
            <strong>Card Number:</strong> {formData.cardNumber}
          </p>
          <p>
            <strong>Expiry Date:</strong> {formData.expiryDate}
          </p>
          <p>
            <strong>CVV:</strong> {formData.cvv}
          </p>
        </div>
        <button type="submit" className="btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}