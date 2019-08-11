const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	// Pobranie tokena z headera
	const token = req.header('x-auth-token');

	// Sprawdzenie jeśli nie ma tokena
	if (!token) {
		return res.status(401).json({ msg: 'Brak tokena, autoryzacja niedostępna' });
	}

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token jest nieprawdiłowy!' });
	}
};
