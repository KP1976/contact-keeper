const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'Witaj w API Contact Keepera' }));

// Definicja Routingów
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server startuje na porcie ${PORT}`));
