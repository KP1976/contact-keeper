const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @routing		GET api/contacts
// @opis			Pobranie wszystkich kontaktów użytkowników
// @dostęp		Prywatny
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
		res.json(contacts);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Błąd serwera');
	}
});

// @routing		Post api/contacts
// @opis			Dodanie nowego kontaktu
// @dostęp		Prywatny
router.post('/', (req, res) => {
	res.send('Dodano kontakt');
});

// @routing		PUT api/contacts/:id
// @opis			Modyfikacja kontaktu
// @dostęp		Prywatny
router.put('/:id', (req, res) => {
	res.send('Kontakt zmodyfikowany');
});

// @routing		DELETE api/contacts/:id
// @opis			Kasowanie kontaktu
// @dostęp		Prywatny
router.delete('/:id', (req, res) => {
	res.send('Kontakt skasowany');
});

module.exports = router;
