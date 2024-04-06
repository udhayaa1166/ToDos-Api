const express = require('express');
const router = express.Router();
const { User, validator } = require('../models/userModel');

//Route Parameters

//To GET list of Users
router.get('/', async (req, res) => {
    const user = await User.find()
    res.send(user);
})

//to GET single user by Id
router.get('/:id', async (req, res) => {
    let user = await User.findById(req.params.id);
    if(!user) res.status(404).send('This user you are looking does not exist');
    res.send(user);
})

//To POST user

router.post('/', async (req, res) => {
    const { error } = validator(req.body);
    const dataExist = await User.find({ name: req.body.name.toString() });
    
    if(error){
        res.status(400).send(error.details[0].message)
    } else if (dataExist.length > 0){
        res.status(400).send("User Already Exists in this Name")
    }
    else {
        const user = new User({
            name: req.body.name,
            age: req.body.age,
            phone: req.body.phone,
            gender: req.body.gender,
            mailId: req.body.mailId
        })

        await user.save()
        res.send(user)
    }
})

//To UPDATE single User by using ID

router.put('/:id', async (req, res) => {
    const { error } = validator(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    } else {
        let user = await User.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            age: req.body.age,
            phone: req.body.phone,
            gender: req.body.gender,
            mailId: req.body.mailId
        }, {new: true})
        if(!user) res.status(404).send('This user you are looking does not exist');
        await user.save();
        res.send(user);
    }
});

//To DELETE user by id

router.delete('/:id', async (req, res) => {
    let user = await User.findByIdAndDelete(req.params.id);
    if(!user) res.status(404).send('The user with given Id was not found');
    res.send(user);
})

module.exports = router;