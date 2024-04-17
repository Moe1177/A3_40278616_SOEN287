const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Q3.html');
});


app.post('/submit', (req, res) => {
    const firstName = req.body.fn;
    const lastName = req.body.ln;
    const fullName = firstName + ' ' + lastName;
    const phone = req.body.telephone;

    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

    if (phonePattern.test(phone)) {
        res.send(`Thank you, ${fullName}. Your telephone number ${phone} matches the correct format`);
    }
    else{
        res.send(`Sorry, ${fullName}. Your telephone number ${phone} does not match the correct format.`)
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})