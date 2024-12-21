import { useState } from 'react';
import dbConnect from '../lib/dbConnect';
import Blockage from '../models/Blockage';

const BlockagePage = () => {
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dbConnect();
    const newBlockage = new Blockage({ location, description });
    await newBlockage.save();
    // Optionally, reset the form or show a success message
  };

  return (
    <div className="blockage-form">
      <h2>Report a Road Blockage</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <style jsx>{`
        .blockage-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }
        form {
          display: flex;
          flex-direction: column;
          width: 300px;
        }
        input, textarea {
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        button {
          padding: 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default BlockagePage;