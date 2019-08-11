const express = require('express');
const router = express.Router();

// @routing		GET api/auth
// @opis			Zalogowanie użytkownika
// @dostęp		Prywatny
router.get('/', (req, res) => {
	res.send('Zalogowanie użytkownika');
});

// @routing		POST api/auth
// @opis			Autoryzacja użytkownika i pobranie tokena
// @dostęp		Publiczny
router.post('/', (req, res) => {
	res.send('Zalogowany');
});

module.exports = router;
