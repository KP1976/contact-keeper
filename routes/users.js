const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @routing		POST api/users
// @opis			Rejestracja użytkownika
// @dostęp		Publiczny
router.post(
	'/',
	[
		check('name', 'Imię jest obowiązkowe!')
			.not()
			.isEmpty(),
		check('email', 'Wprowadź prawidłowy adres email!').isEmail(),
		check('password', 'Wprowadź hasło z 6 lub więcej znakami!').isLength({ min: 6 }),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		res.send('Przeszło...');
	},
);

module.exports = router;
