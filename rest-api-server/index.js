const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.set('port', process.env.PORT || 4000);

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(bodyParser.json());

app.get('/person/:input', (req, res) => {
    const { input } = req.params;
    const data = {
        val1: 1,
        val2: parseInt(input) + 2,
    } 
    res.status(200).json(data);
});

app.get('/facility/:val1', (req, res) => {
    const { val1 } = req.params;
    const data = {
        val3: 3,
        val4: 4 + parseInt(val1),
    }
    res.status(200).json(data);
});

app.get('/exposure/:val2', (req, res) => {
    const { val2 } = req.params;
    const data = {
        val5: 5 + parseInt(val2),
    }
    res.status(200).json(data);
});

app.listen(app.get("port"), () => console.log(`REST Api listening at http://localhost:${app.get("port")}`));