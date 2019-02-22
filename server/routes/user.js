const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

router.post('/', (req, res) => {
    console.log('user signup');

    const { username, password, department, secretCode } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new User({
                username: username,
                password: password,
                department: department,
                secretCode: secretCode,
                userCode: password,
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post(
    '/login',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'),

    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username,
            department: req.user.department
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user);
    var newUser;
    
    User.findOne({ username: req.user.username }, (err, user) => {
        if (err) {
            console.log('User.js get error: ', err)
        } 
        else {
            console.log("user info * dep: ", user.department);
              const userInfo = {
                 username: user.username,
                 department: user.department
             }
             console.log("new user *** : ", userInfo);
             if (req.user) {
                 res.json({ user: userInfo })
             } else {
                 res.json({ user: null })
             }

        }
    })
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router