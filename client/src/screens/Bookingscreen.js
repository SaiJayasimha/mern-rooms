import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

function Bookingscreen() {
  const { roomid, fromdate, todate } = useParams();
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState();
  const fromDateMoment = moment(fromdate, 'DD-MM-YYYY');
  const toDateMoment = moment(todate, 'DD-MM-YYYY');
  const totalDays = toDateMoment.diff(fromDateMoment, 'days') + 1;
  const totalAmount = totalDays * (room?.rentperday || 0);

  useEffect(() => {
    const fetchRoomById = async () => {
      try {
        setLoading(true);
        const data = (await axios.post('/api/rooms/getroombyid', { roomid })).data;
        setRoom(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchRoomById();
  }, [roomid]);

  async function bookRoom() {
    // Function to book the room
  }

  return (
    <div className='m-5'>
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <div className='row justify-content-center mt-5 bs'>
            <div className="col-md-6">
              <h1>{room.name}</h1>
              <img src={room.imageurls[0]} className='bigimg' alt="Room" />
            </div>
            <div className='col-md-6'>
              <div style={{ textAlign: 'right' }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name : </p>
                  <p>From Date : {fromDateMoment.format('DD-MM-YYYY')} </p>
                  <p>To Date : {toDateMoment.format('DD-MM-YYYY')} </p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>
              <div style={{ textAlign: 'right' }}>
                <b>
                  <h1>Amount</h1>
                  <hr />
                  <p>Total days : {totalDays}</p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total amount: {totalAmount}</p>
                </b>
              </div>
              <div style={{ float: 'right' }}>
                <button className="btn btn-primary" onClick={bookRoom}>Pay Now</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error />
      )}
    </div>
  );
}

export default Bookingscreen;
