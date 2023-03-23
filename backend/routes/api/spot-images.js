const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

 //delete a spot image
 router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const image = await SpotImage.findByPk(req.params.imageId);

    if (!image) {
        let err = {};
        err.message = "Spot Image couldn't be found";
        res.status(404);
        return res.json(err);
    }

    const spot = await Spot.findByPk(image.spotId)
    const spotOwner = spot.ownerId;

    const { user } = req;
    if (user.id === spotOwner) {
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
