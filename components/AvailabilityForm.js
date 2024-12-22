export default function AvailabilityForm({ onNext }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const availability = e.target.availability.value;
      onNext({ availability });
    };
  
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-primary">Step 1: Show Availability</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="availability" className="block text-gray-700">
              Availability
            </label>
            <input
              type="text"
              id="availability"
              name="availability"
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