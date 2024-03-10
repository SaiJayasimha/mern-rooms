const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays } = req.body;
  try {
    const newBooking = new Booking({
      room: room.name,
      roomid: room._id,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
      transactionid: "1234"
    });
    
    const booking = await newBooking.save();
    res.status(201).json({ booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
