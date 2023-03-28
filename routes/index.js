var express = require('express');
var router = express.Router();
const uniqid = require('uniqid');
let rooms =[]
let bookings = [];
let roomNo = 100;
let flag = false;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/create-room/' , (req, res) => {
  let room = {};
  room.id = uniqid();
  room.roomNo = roomNo;
  room.bookings = [];
  room.numberOfSeatsAvailable = req.body.numberOfSeatsAvailable;
  room.amenitiesInRoom = req.body.amenitiesInRoom;
  room.pricePerHour = req.body.pricePerHour;
  rooms.push(room)
  room++;
  res.send({
    statusCode : 200 ,
    message : "rooms added "
  })
})

router.post('/book-room/',function(req,res) {
  console.log(req.body)
  console.log(bookings.length)
  let booking = {} 
  booking.id = uniqid();
  if(bookings.length === 0){
    booking.customerName = req.body.customerName
    booking.date = req.body.date
    booking.startTime = req.body.startTime
    booking.endTime = req.body.endTime
    booking.roomId = req.body.roomId
    bookings.push(booking)
    res.send({
      statusCode : 201 ,
      message : "Booking successfully done."
      
    })
  }
  if(req.body.customerName !== null && req.body.date !== null && req.body.startTime !== null 
    && req.body.endTime !== null && req.body.roomNo !== null) {
      bookings.map(booking => {
        console.log(booking)
        if(booking.roomId === req.body.roomId) {
          if(booking.date === req.body.date) {
            if(booking.startTime >= req.body.startTime) {
              flag = false ;
            }
          }
        }else {
          flag = true
        }
      })
      if(flag === true) { 
        booking.customerName = req.body.customerName
        booking.date = req.body.date
        booking.startTime = req.body.startTime
        booking.endTime = req.body.endTime
        booking.roomId = req.body.roomId
        bookings.push(booking)
        res.send({
          statusCode : 201 ,
          message : "Booking successfully done."
          
        })
      }
      else {
        res.send({
          statusCode : 400 ,
          message : "Already booked"
        })
      }
    }else {
      res.send({
        statusCode : 400 ,
        message : "Please Enter all fields"
      })
    }
})

router.get('/get-bookings/' , function(req, res) {
  res.send({
    statusCode : 200,
    message : "listed successfully",
    bookings
  })
})
module.exports = router;
