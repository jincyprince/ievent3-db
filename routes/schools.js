const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const School = require('../models/School');
const keys = require('../config/keys');

router.get('/city/:qCity/:qSport?', (req, res) => {
    let search = { city: req.params.qCity };

    if (!!req.params.qSport) {
        search['sports'] = { '$in': [req.params.qSport] };
    }

    School.find(search)
        .then(sch => res.json(sch))
        .catch(err => console.log(err));
});

router.get('/:qCode?', (req, res) => {
    let search = {};

    if (!!req.params.qCode) {
        search['name'] = req.params.qCode;
    }

    School.find(search)
        .then(sch => res.json(sch))
        .catch(err => console.log(err));
});

router.post('/', (req, res) => {

    School.findOne({ name: req.body.name }).then(sch => {
        if (sch) {
            return res.status(400).json({ email: "School already exists" });
        } else {
            const newSchool = new School({
                name: req.body.name,
                city: req.body.city,
                sports: req.body.sports.split(','),
            });

            newSchool
                .save()
                .then(sch => res.json(sch))
                .catch(err => console.log(err));
        }

    });
});



//   router.post('/login', (req,res)=> {

//     const email= req.body.email;
//     const password= req.body.password;

//     User.findOne({email}).then(user => {
//         if(!user)
//         {
//             return res.status(400).json({email:"User account does not exist"});

//         }

//         else{
//             bcrypt.compare(password,user.password).then(isMatch=> {
//                 if(isMatch)
//                 {
//                    const payload ={id:user.id, name:user.name};

//                    // Sign Token
//         jwt.sign(
//             payload,
//             keys.secret,
//             { expiresIn: 3600 },
//             (err, token) => {
//               res.json({
//                 success: true,
//                 token: 'Bearer ' + token,
//                 name: user.name
//               });
//             }
//           );


//                 }

//                 else{
//                     return res.status(400).json({email:"Passwords is invalid"});
//                 }
//             })
//         }
//     })

//   });



module.exports = router;