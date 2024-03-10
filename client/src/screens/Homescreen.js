import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Input } from 'antd'; // Import Input from antd
import moment from 'moment';

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fromdate, setFromDate] = useState(null); 
  const [todate, setToDate] = useState(null); 
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = '/api/rooms/getallrooms';
        if (searchQuery) { // If search query is present, append it to the URL
          url += `?city=${searchQuery}`;
        }
        const { data } = await axios.get(url);
        setRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]); // Refetch data when search query changes

  function filterByDate(dates, dateStrings) {
    setFromDate(dateStrings[0]); 
    setToDate(dateStrings[1]); 
  }

  function handleSearchInputChange(e) {
    setSearchQuery(e.target.value); // Update search query state
  }

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className="col-md-3">
          <Input placeholder="Search city" onChange={handleSearchInputChange} /> {/* Input for search */}
          <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : rooms.length > 0 ? (
          rooms.map(room => (
            <div key={room.id} className="col-md-9 mt-2">
              <Room room={room} fromdate={fromdate} todate={todate} />
            </div>
          ))
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default Homescreen;
