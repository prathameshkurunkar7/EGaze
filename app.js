const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const compression = require('compression');

const app = express()

app.use(helmet({
    contentSecurityPolicy: false,
}));
app.use(cors());
app.use(compression());

app.set('trust proxy', 1);
 
const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1hr
    max: 100,
    message: 'Too many requests from this IP,please try again later.'
});

app.use(express.json({limit:'300kb'}));
app.use(express.urlencoded({extended:false}));

// app.use('/uploads/',express.static(path.join('uploads')));

//all routes here
// app.use('/api/content/',apiLimiter,contentRouter);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Error Handling Middleware
app.use((error, req, res, next) => {
    // if(req.file){
    //     fs.unlink(req.file.path,err =>{
    //         if(err) console.log(err);
    //     })
    // }
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An Unknown Error has Occured' })
})

module.exports = app;