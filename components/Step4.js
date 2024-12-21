export default function Step4({ formData, onSubmit }) {
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-primary">Step 4: Review</h2>
        <form onSubmit={onSubmit} className="space-y-4">
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