import { useState } from 'react';
import styles from './DriverRegistrationForm.module.css';

const DriverRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: { first: '', last: '' },
    phoneNumber: '',
    email: '',
    verificationType: '',
    address: { street1: '', street2: '', city: '', state: '', postcode: '' },
    userType: '', // Add field for Client or Volunteer
    bankDetails: { accountNumber: '' },
    driverLicense: null,
    passport: null,
    workRights: null,
    drivingHistory: null,
    policeCheck: null,
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e, field, subField) => {
    setFormData((prevData) => {
      if (subField) {
        return { ...prevData, [field]: { ...prevData[field], [subField]: e.target.value } };
      }
      return { ...prevData, [field]: e.target.value };
    });
  };

  const handleFileChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.userType === 'client') {
      setShowPopup(true); // Show the pop-up for Client
    } else {
      console.log(formData); // Process form submission for Volunteer
    }
  };

  const handleClosePopup = () => setShowPopup(false);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Driver Registration Form</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="firstName">Full Name *</label>
          <div className={styles.nameInputs}>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              onChange={(e) => handleChange(e, 'fullName', 'first')}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => handleChange(e, 'fullName', 'last')}
              required
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input
            type="tel"
            id="phoneNumber"
            onChange={(e) => handleChange(e, 'phoneNumber')}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            onChange={(e) => handleChange(e, 'email')}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="verificationType">Verification Type *</label>
          <select
            id="verificationType"
            onChange={(e) => handleChange(e, 'verificationType')}
            required
          >
            <option value="">Please Select</option>
            <option value="aadhar">AADHAR</option>
            <option value="drivingLicense">Driving License</option>
            <option value="panCard">PAN Card</option>
            <option value="voterId">Voter ID</option>
            <option value="passport">Passport</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Address</label>
          <input
            type="text"
            placeholder="Street Address"
            onChange={(e) => handleChange(e, 'address', 'street1')}
          />
          <input
            type="text"
            placeholder="Street Address Line 2"
            onChange={(e) => handleChange(e, 'address', 'street2')}
          />
          <input
            type="text"
            placeholder="City"
            onChange={(e) => handleChange(e, 'address', 'city')}
          />
          <input
            type="text"
            placeholder="State / Province"
            onChange={(e) => handleChange(e, 'address', 'state')}
          />
          <input
            type="text"
            placeholder="Postal / Zip code"
            onChange={(e) => handleChange(e, 'address', 'postcode')}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="userType">Are you a Client or Volunteer? *</label>
          <select
            id="userType"
            onChange={(e) => handleChange(e, 'userType')}
            required
          >
            <option value="">Please Select</option>
            <option value="client">Client</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        {formData.userType === 'volunteer' && (
          <>
            <div className={styles.inputGroup}>
              <label htmlFor="accountNumber">Bank Details *</label>
              <input
                type="text"
                id="accountNumber"
                onChange={(e) => handleChange(e, 'bankDetails', 'accountNumber')}
                required
              />
            </div>

            {['driverLicense', 'passport', 'workRights', 'drivingHistory', 'policeCheck'].map(
              (field) => (
                <div key={field} className={styles.fileUpload}>
                  <label htmlFor={field}>
                    {field.charAt(0).toUpperCase() + field.slice(1)} *
                  </label>
                  <div className={styles.fileDropArea}>
                    <input
                      type="file"
                      id={field}
                      onChange={(e) => handleFileChange(e, field)}
                      hidden
                    />
                    <label htmlFor={field} className={styles.fileLabel}>
                      Browse Files<br />Drag and drop files here
                    </label>
                  </div>
                </div>
              )
            )}
          </>
        )}

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p>Thanks for Registering!</p>
            <button onClick={handleClosePopup} className={styles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DriverRegistrationForm;
