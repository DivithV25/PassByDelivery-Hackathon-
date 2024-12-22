export default function DeviationForm({ onNext }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const deviations = parseFloat(e.target.deviations.value); // Parse the input as a number
      if (isNaN(deviations)) {
        alert("Please enter a valid number for deviations.");
        return;
      }
      onNext({ deviations });
    };
  
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-primary">Step 4: Add Deviations (in km)</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="deviations" className="block text-gray-700">
              Deviations (in km)
            </label>
            <input
              type="number" // Change input type to "number"
              id="deviations"
              name="deviations"
              step="0.1" // Allow decimal values
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