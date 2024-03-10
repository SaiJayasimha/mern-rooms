// AdminHotelForm.js
import React, { useState } from 'react';

function AdminHotelForm() {
  const [name, setName] = useState('');
  // Add other fields according to the room model

  const handleAddHotel = () => {
    // Logic to add hotel details
  };

  return (
    <div>
      <h3>Add Hotel</h3>
      <form onSubmit={handleAddHotel}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        {/* Add other input fields for hotel details */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AdminHotelForm;
