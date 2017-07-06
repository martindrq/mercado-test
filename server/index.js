const path = require('path');
const express = require('express');
const app = express();
const items = require('./resources/items');
app.use(express.static(path.resolve(__dirname, '..', 'build')));


app.get('/api/items/:id', items.get);
app.get('/api/items', items.query);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
