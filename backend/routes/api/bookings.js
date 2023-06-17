const express = require("express");
const { requireAuth } = require("../../utils/auth");
const {
  Booking,
  User,
  Spot,
  ReviewImage,
  SpotImage,
} = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/current", requireAuth, async (req, res, next) => {
  const currentUserId = req.user.id;
  let bookings = await Booking.findAll({
    where: { userId: currentUserId },
    include: [
      {
        model: Spot,
      },
    ],
  });
  let bookingList = [];
  bookings.forEach((booking) => {
    bookingList.push(booking.toJSON());
  });
  for (let i = 0; i < bookingList.length; i++) {
    let booking = bookingList[i];
    const spotImage = await SpotImage.findOne({
      where: { spotId: booking.spotId },
      attributes: ["url"],
    });
    if (spotImage) {
      booking.Spot.previewImage = spotImage.url;
    }
    delete booking.Spot.createdAt;
    delete booking.Spot.updatedAt;
  }
  res.json({ Bookings: bookingList });
});

//   edit a booking
router.put("/:bookingId", requireAuth, async (req, res, next) => {
  let { startDate, endDate } = req.body;
  const { user } = req;
  let id = req.params.bookingId;
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  const currBooking = await Booking.findByPk(id);

  if (!currBooking) {
    let err = {};
    err.message = "Booking couldn't be found";
    // res.status(404);
    return res.json(err);
  }

  if (endDate < new Date() || startDate < new Date()) {
    // res.status(400);
    let err = {};
    err.message = "Booking can not be in the past";
    err.errors = {
      endDate: "Booking can not be in the past",
    };
    return res.json(err);
  }

  if (endDate <= startDate) {
    // res.status(400);
    let err = {};
    err.message = "End date cannot come before start date";
    err.errors = {
      endDate: "endDate cannot come before startDate",
    };
    return res.json(err);
  }

  //this block will check if dates are in the past
  //since my current seed data is all in the future, this will always trigger
  //commenting until i update seed data or code

  let currentDate = new Date();
  currentDate = currentDate.toJSON().split("T")[0];
  let bookingEndDate = currBooking.endDate;
  if (bookingEndDate < currentDate) {
    // res.status(400);
    let err = {};
    err.message = "Past bookings can't be modified";
    return res.json(err);
  }

  //make sure the new booking doesnt conflict with current bookings on the spot
  const existingBookings = await Booking.findAll({
    where: { spotId: currBooking.spotId },
  });

  let hasConflict = false;
  for (let i = 0; i < existingBookings.length; i++) {
    const booking = existingBookings[i];

    // Exclude the current booking being edited from the conflict check
    if (booking.id !== id) {
      const bookingStartDate = booking.startDate;
      const bookingEndDate = booking.endDate;

      // Check if the booking conflicts with any existing bookings
      if (
        (startDate >= bookingStartDate && startDate <= bookingEndDate) ||
        (endDate >= bookingStartDate && endDate <= bookingEndDate)
      ) {
        hasConflict = true;
        break;
      }
    }
  }

  if (hasConflict) {
    // res.status(403);
    const err = {
      message: "Sorry, this spot is already booked for the specified dates",
      errors: {
        startDate: "Start date conflicts with an existing booking",
        endDate: "End date conflicts with an existing booking",
      },
    };
    return res.json(err);
  }

  let bookingsList = [];
  existingBookings.forEach((booking) => {
    bookingsList.push(booking.toJSON());
  });

  for (let i = 0; i < bookingsList.length; i++) {
    //for every booking on this spot, check the dates for conflicts with new booking
    let booking = bookingsList[i];
    //exclude this booking id from search
    if (booking.id == id) break;

    let bookingStartDate = booking.startDate;
    let bookingEndDate = booking.endDate;

    let err = {};
    if (startDate >= bookingStartDate && startDate <= bookingEndDate) {
      //   res.status(403);
      err.message =
        "Sorry, this spot is already booked for the specified dates";
      err.errors = {};
      err.errors.startDate = "Start date conflicts with an existing booking";
      if (endDate >= bookingStartDate && endDate <= bookingEndDate) {
        // res.status(403);
        err.message =
          "Sorry, this spot is already booked for the specified dates";
        err.errors.endDate = "End date conflicts with an existing booking";
      }
      return res.json(err);
    }
    if (endDate >= bookingStartDate && endDate <= bookingEndDate) {
      //   res.status(403);
      err.message =
        "Sorry, this spot is already booked for the specified dates";
      err.errors = {};
      err.errors.endDate = "End date conflicts with an existing booking";
      return res.json(err);
    }
  }

  // if user owns the booking, update it, else forbidden
  if (user.id === currBooking.userId) {
    await currBooking.update({
      userId: user.id,
      spotId: parseInt(currBooking.spotId),
      startDate,
      endDate,
    });
    res.json(currBooking);
  } else {
    let err = {};
    err.message = "Forbidden";
    err.status = 403;
    next(err);
  }
});

//delete a booking
router.delete("/:bookingId", requireAuth, async (req, res, next) => {
  const booking = await Booking.findByPk(req.params.bookingId);

  if (!booking) {
    let err = {};
    err.message = "Booking couldn't be found";
    res.status(404);
    return res.json(err);
  }

  // check if startDate has happened already or not
  let currentDate = new Date();
  currentDate = currentDate.toJSON().split("T")[0];
  let bookingStartDate = booking.startDate.toJSON().split("T")[0];
  if (bookingStartDate <= currentDate) {
    res.status(400);
    let err = {};
    err.message = "Bookings that have been started can't be deleted";
    return res.json(err);
  }

  const { user } = req;
  if (user.id === booking.userId) {
    await booking.destroy();
    res.json({
      message: "Successfully deleted",
    });
  } else {
    let err = {};
    err.message = "Forbidden";
    err.status = 403;
    next(err);
  }
});

module.exports = router;
