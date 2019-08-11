const express = require('express');
const router = express.Router();

// @routing		POST api/users
// @opis			Rejestracja użytkownika
// @dostęp		Publiczny
router.post('/', (req, res) => {
	res.send('Rejestracja użytkownika');
});

module.exports = router;
