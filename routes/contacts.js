const express = require('express');
const router = express.Router();

// @routing		GET api/contacts
// @opis			Pobranie wszystkich kontaktów użytkowników
// @dostęp		Prywatny
router.get('/', (req, res) => {
	res.send('Pobrano wszystkie kontakty');
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
