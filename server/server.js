const express = require('express')
const LocalStrategy = require('passport-local').Strategy
const dao = require('./dao.js')
const morgan = require('morgan')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors');

passport.use(new LocalStrategy((username,password,done)=>{
  dao.getUser(username, password).then(user=>{
    if(!user)
      return done(null, false, {"message":"wrong username or password"})
    return done(null, user)
  })
}))

passport.serializeUser((user,done)=>{
  done(null, user)
})

passport.deserializeUser((user,done)=>{
  console.log(user)
  dao.getUsername(user).then(user=>{
    done(null,user)
  })
  .catch(err=>{
    done(err, null)
  })
})

const app = express()
const port = 3001

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
  credentials: true,
}));
app.use(morgan('dev'))
app.use(express.json())
app.use(session({
  secret: "Oh, sì... Il Sanguesmunto... Bene, hai raggiunto il luogo giusto... Yharnam è la sede dell'infusione del sangue. Tu devi solo svelare il suo mistero. Ma da dove può partire chi ignora tutto, come te? Calma. Quando avrai un po' di sangue di Yharnam... Prima, però, dovrai siglare un contratto.",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

const loggedIn = (req,res, next)=>{
  if(req.isAuthenticated())
    return next()
  return res.status(400).json({msg: "not authenticated"})
}

app.get('/api/protected', loggedIn, (req, res) => {
  res.send('Hello World!')
})

app.post('/api/sessions', passport.authenticate('local'), (req, res) => {
  res.json(req.user)
})

app.get('/api/sessions/check', (req, res) => {
  if(req.isAuthenticated())
    res.json(req.user)
  else
    res.status(401).json({error: "Not Authenticated"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})