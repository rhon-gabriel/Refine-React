const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbService = require('./db/mongoService');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/greeting', async (req, res) => {
  const item = await dbService.findById();
  res.send(item);
});

app.post('/api/greeting', (req, res) => {
  dbService.addItem(req.body);
  res.sendStatus(200);
});

app.delete('/api/greeting/:id', async (req, res) => {
  dbService.deleteItem(req.params.id);
  res.sendStatus(200);
});

const port = 8080;

app.listen(port, () => process.stdout.write(`Server is listening on port ${port}`));
