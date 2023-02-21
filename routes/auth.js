const userSchema = require('../model/userSchema');
const jwt = require('jsonwebtoken')
const router = require('express').Router();
const { registerValidation, loginValidation } = require('../validation.js')
const bcrypt = require('bcrypt')


//POST
router.post('/register', async (req, res) => {


    //if validation fail it will throw the error
    const { error } = registerValidation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    // if email is alredy exists it will return badRequest 
    const emilaExist = await userSchema.findOne({ email: req.body.email });
    if (emilaExist) {
        return res.status(400).send("Email already Exists");
    }
    //create salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new userSchema({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const response = await user.save();
        res.send({ user: user.userName });

    } catch (error) {
        throw error;
    }
});

//POST
router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const user = await userSchema.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).send("Email is wrong");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) {
        return res.status(400).send(" Invalid password");
    }
    //create token 
    const token = jwt.sign({ userName: user.userName }, process.env.TOKEN_SEC);
    res.header('auth-token', token).send(token)



})

module.exports = router;