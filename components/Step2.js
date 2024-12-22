export default function Step2({ onNext }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = {
        pickupAddress: e.target.pickupAddress.value,
        dropAddress: e.target.dropAddress.value,
      };
      onNext(formData);
    };
  
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-primary">Step 2: Pickup & Drop Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="md:w-1/2">
            <label htmlFor="pickupAddress" className="block text-gray-700">
              Pickup Address
            </label>
            <input
              type="text"
              id="pickupAddress"
              name="pickupAddress"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="md:w-1/2">
            <label htmlFor="dropAddress" className="block text-gray-700">
              Drop Address
            </label>
            <input
              type="text"
              id="dropAddress"
              name="dropAddress"
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