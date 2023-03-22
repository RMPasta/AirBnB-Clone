const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/current', requireAuth, async (req, res, next) => {
    const currentUserId = req.user.id;
    let reviews = await Review.findAll({where: {userId: currentUserId}});
    res.json({ Reviews: reviews })
});



module.exports = router;
