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
router.post(
	'/',
	[
		auth,
		[
			check('name', 'Imię jest obowiązkowe')
				.not()
				.isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone, type } = req.body;

		try {
			const newContact = new Contact({
				name,
				email,
				phone,
				type,
				user: req.user.id,
			});

			const contact = await newContact.save();

			res.json(contact);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Błąd serwera');
		}
	},
);

// @routing		PUT api/contacts/:id
// @opis			Modyfikacja kontaktu
// @dostęp		Prywatny
router.put('/:id', auth, async (req, res) => {
	const { name, email, phone, type } = req.body;

	// Utworzenie objektu contact
	const contactFields = {};
	if (name) contactFields.name = name;
	if (email) contactFields.email = email;
	if (phone) contactFields.phone = phone;
	if (type) contactFields.type = type;

	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ msg: 'Kontakt nie znaleziony' });

		// Upewnienie się czy użytkownik jest właścicielem kontaktu
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Brak autoryzacji!' });
		}

		contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });

		res.json(contact);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Błąd serwera');
	}
});

// @routing		DELETE api/contacts/:id
// @opis			Kasowanie kontaktu
// @dostęp		Prywatny
router.delete('/:id', auth, async (req, res) => {
	try {
		let contact = await Contact.findById(req.params.id);

		if (!contact) return res.status(404).json({ msg: 'Kontakt nie znaleziony' });

		// Upewnienie się czy użytkownik jest właścicielem kontaktu
		if (contact.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Brak autoryzacji!' });
		}

		await Contact.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Kontakt usunięty...' });
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Błąd serwera');
	}
});

module.exports = router;
