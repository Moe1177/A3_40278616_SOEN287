const express = require('express');
const cookieParser = require('cookie-parser');
const moment = require('moment-timezone');

const app = express();

app.use(cookieParser());

app.get('/', (req, res) => {
    const visits = parseInt(req.cookies['visits']) || 0;

    if (visits === 0) {
        res.cookie('visits', 1);
        res.send('<h1>Welcome to my webpage! It is the first time that you are here.</h1>');
    }
    else{
        let visitTime = '';
        if (req.cookies.visitTime) {
            visitTime = moment(parseInt(req.cookies.visitTime)).tz('America/New_York').format('ddd MMM DD HH:mm:ss z YYYY');
        }


        const time = moment().valueOf();

        res.cookie('visits', visits + 1);
        res.cookie('visitTime', time);
        res.send(`<h1>Hello, this is the ${visits + 1} time that you are visiting my webpage.</h1> <br> Last time you visted my website was at: ${visitTime}`)
    }
});


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
})