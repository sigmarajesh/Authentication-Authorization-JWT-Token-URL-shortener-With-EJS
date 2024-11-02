const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const { connectToMongoDb} = require('./connect');
const {checkForAuthontication, restrictTo} = require('./middleware/auth');

const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter')
const userRoute = require('./routes/user')

const app = express();

connectToMongoDb('mongodb://localhost:27017/short-url')
    .then(() => console.log( "mongodbb connected")
);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthontication);

app.use('/url', restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use('/user',userRoute);
app.use('/', staticRouter);

app.get("/url/:shortId",  async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    }, {$push: {
        visitHistory: {
            timestamp: Date.now(),
        },
    },});
 res.redirect(entry.redirectURL);
});

app.listen(3000, () => console.log('Server is started at PORT 3000 '));