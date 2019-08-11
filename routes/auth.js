const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @routing		GET api/auth
// @opis			Zalogowanie użytkownika
// @dostęp		Prywatny
router.get('/', (req, res) => {
	res.send('Zalogowanie użytkownika');
});

// @routing		POST api/auth
// @opis			Autoryzacja użytkownika i pobranie tokena
// @dostęp		Publiczny
router.post(
	'/',
	[check('email', 'Wprowadź prawidłowy adres email!').isEmail(), check('password', 'Hasło jest potrzebne').exists()],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ msg: 'Nieprawidłowe uwierzytelnienie' });
			}

			const isMatch = await bcrypt.compare(password, user.password);

			if (!isMatch) {
				return res.status(400).json({ msg: 'Nieprawidłowe uwierzytelnienie' });
			}

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000,
				},
				(err, token) => {
					if (err) throw err;
					res.json({ token });
				},
			);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Błąd serwera');
		}
	},
);

module.exports = router;
