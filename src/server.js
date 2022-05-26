const express = require('express');
const connectDB = require('./utils/database');
const Url = require('./schemas/Url');
const logger = require('./utils/logger');
const id = require('./utils/id');
require('dotenv').config();


const app = express();

app.use(express.json());
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    let [shortUrls, total] = await Promise.all([
        Url.find(),
        Url.countDocuments()
    ]) 

    res.render('index', {
        shortUrls,
        total
    });
});

app.post('/shorten', async (req, res) => {
    const URL = req.body.url;
    if (!URL) {
        res.status(400).send('Please provide a URL.');
    } else {
        try {
            const record = new Url({
                originalUrl: URL,
                shortUrl: id.generate()
            });
            await record.save();

            logger.event(`New URL shortened: ${record.originalUrl} > ${record.shortUrl}`);
            res.status(201).redirect('/');
        } catch (error) {
            res.redirect('/');
        }
    }
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;

    const URL = await Url.findOne({ shortUrl });
    if (!URL) {
        res.status(404).send('URL not found');
    } else {
        URL.clicks++;
        await URL.save();
        res.status(301).redirect(URL.originalUrl);
    }
});

let PORT = process.env.PORT || 3500;
app.listen(PORT, async () => {
    await connectDB();
    logger.event(`Server is running on ${PORT}.`);
});
