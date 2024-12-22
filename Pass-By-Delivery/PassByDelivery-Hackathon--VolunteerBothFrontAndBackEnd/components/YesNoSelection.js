export default function YesNoSelection({ onSubmit, formData }) {
    const handleSubmit = (e) => {
      e.preventDefault();
      const confirm = e.target.confirm.value;
  
      if (confirm === "yes") {
        onSubmit(); // Move to the next step to show requests
      } else {
        alert("You chose not to confirm. Please restart the process.");
      }
    };
  
    return (
      <div className="card">
        <h2 className="text-2xl font-bold mb-4 text-primary">Step 5: Confirm</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p>
              <strong>Availability:</strong> {formData.availability}
            </p>
            <p>
              <strong>Start Time:</strong> {formData.startTime}
            </p>
            <p>
              <strong>Route:</strong> {formData.route}
            </p>
            <p>
              <strong>Deviations:</strong> {formData.deviations} km
            </p>
          </div>
          <div>
            <label htmlFor="confirm" className="block text-gray-700">
              Confirm
            </label>
            <select
              id="confirm"
              name="confirm"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }