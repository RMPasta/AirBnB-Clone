const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Booking, User, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

module.exports = router;
