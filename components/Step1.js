export default function Step1({ onNext }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = {
        itemName: e.target.itemName.value,
        itemDetails: e.target.itemDetails.value,
      };
      onNext(formData);
    };
  
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-primary">Step 1: Select Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="md:w-1/2">
            <label htmlFor="itemName" className="block text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              id="itemName"
              name="itemName"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="md:w-1/2">
            <label htmlFor="itemDetails" className="block text-gray-700">
              Item Details
            </label>
            <textarea
              id="itemDetails"
              name="itemDetails"
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