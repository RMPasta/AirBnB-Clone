const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('First Name is required'),
    check('lastName')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Last Name is required'),
    handleValidationErrors
  ];

  router.post('/', validateSignup, async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;

      const emailCheck = await User.findOne({where: {email: email}})
      if (emailCheck) {
        let err = {};
        err.message = "User already exists"
        err.errors = {
          email: "User with that email already exists",
        }
        res.status(400)
        return res.json(err)
      }
      const usernameCheck = await User.findOne({where: {username: username}})
      if (usernameCheck) {
        let err = {};
        err.message = "User already exists"
        err.errors = {
          username: "User with that username already exists",
        }
        res.status(400)
        return res.json(err)
      }

      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword, firstName, lastName });

      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );
module.exports = router;
