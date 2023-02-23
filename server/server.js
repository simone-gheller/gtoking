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

app.get('/api/ranges', loggedIn, (req, res) => {
  dao.getRange(req.user).then(range=>{
    if(!range)
      return res.status(501).json({error: "Error fetching from DB"})
    res.json(range)
  })
})

app.post('/api/ranges/update', loggedIn, (req, res) => {
  const row = req.body.row.toString().replaceAll(',','')
  dao.updateRange(req.user, req.body.rowNumber, row).then(result=>{
    if(!result)
      return res.status(501).json({error: "Error connecting to DB"})
    res.json(result)
  })
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