export default function RouteForm({ onNext }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const route = e.target.route.value;
      onNext({ route });
    };
  
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-primary">Step 3: Add Route</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="route" className="block text-gray-700">
              Route
            </label>
            <textarea
              id="route"
              name="route"
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