require('./api/models/db');
require('./api/config/passport');
require('dotenv').config();

const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const routesApi = require('./api/routes/index');
const cors = require('cors');
const { List } = require('./models');
var employeeController = require('./controllers/employeeController.js');
const profilesRoutes = require('./routes/images');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(passport.initialize());
app.use("/api", routesApi);
app.use('/employees', employeeController);
app.use('/images', express.static(path.join('images')));

app.use('/api/profiles', profilesRoutes);

app.get('/lists',  (req, res) => {
    List.find().then((lists) => {
        res.send(lists);
    }).catch((e) => {
        res.send(e);
        console.log(e);

    });
})
app.post('/lists', (req, res) => {
    let title = req.body.title;
    let lang = req.body.lang;
      let pro = req.body.pro;

    let newList = new List({
        title,
        lang,
        pro
    });

    newList.save().then((listDoc) => {
        res.send(listDoc);
    })
});

app.patch('/lists/:id', (req, res) => {
  var emp = {
  pro: req.body.pro
    };
    List.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: `${err.name}: ${err.message}` });
  }
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
