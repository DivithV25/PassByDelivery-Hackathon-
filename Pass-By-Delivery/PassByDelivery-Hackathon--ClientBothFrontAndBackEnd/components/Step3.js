export default function Step3({ onNext }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = {
        cardNumber: e.target.cardNumber.value,
        expiryDate: e.target.expiryDate.value,
        cvv: e.target.cvv.value,
      };
      onNext(formData);
    };
  
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-primary">Step 3: Payment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="md:w-1/2">
            <label htmlFor="cardNumber" className="block text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="md:w-1/2">
            <label htmlFor="expiryDate" className="block text-gray-700">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="md:w-1/2">
            <label htmlFor="cvv" className="block text-gray-700">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Next
          </button>
        </form>
      </div>
    );
  }