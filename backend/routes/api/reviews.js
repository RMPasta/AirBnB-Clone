const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


router.get('/current', requireAuth, async (req, res, next) => {
    const currentUserId = req.user.id;
    let reviews = await Review.findAll({
        where: {userId: currentUserId},
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
        ]
    });
    let reviewList = [];
    reviews.forEach(review => {
        reviewList.push(review.toJSON())
    })
    for (let i = 0; i < reviewList.length; i++) {
        let review = reviewList[i];
        const spotImage = await SpotImage.findOne({
            where: {spotId: review.spotId},
            attributes: ['url']
        });
        review.Spot.previewImage = spotImage.url;
        delete review.Spot.createdAt;
        delete review.Spot.updatedAt;
    }
    res.json({ Reviews: reviewList })
});

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    let { user } = req;
    let { url } = req.body;
    let id = req.params.reviewId;

    const review = await Review.findByPk(id);

    if (!review) {
        let err = {};
        err.message = "Review couldn\'t be found";
        res.status(404);
        return res.json(err);
    }

    let reviewImages = await ReviewImage.findAll({
        where: { reviewId: id }
    })
    let imageArr = [];
    reviewImages.forEach(image => {
        imageArr.push(image.toJSON());
    })

    if (imageArr.length >= 10) {
        let err = {};
        err.message = "Maximum number of images for this resource was reached";
        res.status(403);
        return res.json(err);
    }

    if (user.id === review.userId) {
        const  image = await ReviewImage.create({
            reviewId: id,
            url,
        });
        res.json({
            id: image.id,
            url: image.url,
        })
    } else {
        let err = {};
        err.message = "Forbidden";
        err.status = 403;
        next(err)
    };
});

//   edit a review
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    let { review, stars } = req.body;
    stars = parseInt(stars);
    console.log(review, stars)
    if (!review || isNaN(stars) || stars < 1 || stars > 5) {
        res.status(400)
        let err = {};
        err.message = "Bad Request"
        err.errors = {
            review: "Review text is required",
            stars: "Stars must be an integer from 1 to 5",
        }
        return res.json(err)
    }
    const { user } = req;
    let id = req.params.reviewId;

    const currReview = await Review.findByPk(id);

    if (!currReview) {
        let err = {};
        err.message = "Review couldn\'t be found";
        res.status(404);
        return res.json(err);
    }

    if (user.id === currReview.userId) {
        await currReview.update({
            review: review,
            stars,
        });
        res.json(currReview)
    } else {
        let err = {};
        err.message = "Forbidden";
        err.status = 403;
        next(err)
    };
  });

  //delete a review
  router.delete('/:reviewId', requireAuth, async (req, res, next) => {

    const review = await Review.findByPk(req.params.reviewId);

    if (!review) {
        let err = {};
        err.message = "Review couldn\'t be found";
        res.status(404);
        return res.json(err);
    }

    const { user } = req;
    if (user.id === review.userId) {
        await review.destroy();
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
