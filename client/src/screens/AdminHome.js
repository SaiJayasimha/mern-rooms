// AdminHome.js
import React from 'react';

function AdminHome() {
  return (
    <div>
      <h3>Admin Home</h3>
      {/* Display hotel details here */}
      <button onClick={() => handleAddHotel()}>Add Hotel</button>
      <button onClick={() => handleUpdateHotel()}>Update Hotel</button>
    </div>
  );
}

export default AdminHome;
