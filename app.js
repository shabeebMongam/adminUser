const express = require('express');
const path = require('path');
const hbs = require('express-handlebars')
const db = require('./config_db/connection');
const session = require('express-session');
const oneDay = 1000*60*60*24;
const oneMin = 1000*60;
const nocache = require('nocache')






const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');




const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"keyuser",
  saveUninitialized:true,
  cookie:{maxAge:oneDay},
  resave: false 
}));
app.use(nocache())
// app.use('/admin',session({
//   secret:"keyadmin",
//   saveUninitialized:true,
//   cookie:{maxAge:oneDay},
//   resave: false
// }));
// app.use(nocache())

db.connect((err)=>{
    if(err){
    console.log("Connection Error"+err);
    }
    else{
      console.log("DB Connected");
    }
  });



app.use('/',userRouter);
app.use('/admin',adminRouter);


app.listen(5000,()=>{
    console.log("Listening to port 5000");
})