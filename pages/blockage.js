import { useState } from "react";
import styles from '../components/blockage.module.css';


const BlockageReport = () => {
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    image: null,
    severity: "low",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you for reporting the blockage!");
    // Add API call to submit the blockage data
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Report a Road Blockage</h1>
      <p className={styles.description}>
        Help us improve traffic conditions by reporting road blockages.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the blockage (e.g., fallen tree, construction)..."
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location or use map"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="severity">Severity *</label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="image">Upload Image (Optional)</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default BlockageReport;
