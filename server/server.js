const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const ctrl = require('./watchlist'); 

const app = express();

app.use(bodyParser.json());

app.use(cors());

const PORT = 3535;
app.post('/api/addmovie', ctrl.create);
app.get('/api/getwatchlist', ctrl.read);
app.put('/api/updateyear/:id/:year', ctrl.update)
app.delete('/api/deletemovie/:id', ctrl.delete);

app.listen(PORT, () => console.log('we are listening on port ' + PORT));
