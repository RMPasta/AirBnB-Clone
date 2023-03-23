const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review, User, Spot, ReviewImage } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

 //delete a review image
 router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const image = await ReviewImage.findByPk(req.params.imageId);

    if (!image) {
        let err = {};
        err.message = "Review Image couldn't be found";
        res.status(404);
        return res.json(err);
    }

    const review = await Review.findByPk(image.reviewId)
    const reviewOwner = review.userId;

    const { user } = req;
    if (user.id === reviewOwner) {
        await image.destroy();
        res.json({
            message: "Successfully deleted"
        });
    } else {
        let err = {};
        err.message = "Forbidden";
        err.status = 403;
        next(err)
    };
  });

module.exports = router;
