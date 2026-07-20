const express = require('express');
const routes = require('./routes/notes');

const app = express();
app.use(express.json());

// لا توجد Security Headers (Helmet) ولا Rate Limiter
app.use('/api', routes);

module.exports = app;