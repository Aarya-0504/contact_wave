const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const auth = require("../middlewares/auth");
const user = require("../models/user");


router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res
        .status(400)
        .json({ error: `Please enter all required fields!` });

    const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // name validation.
    if (name.length > 25)
        return res
            .status(400)
            .json({ error: "name can only be less than 25 characters" });

    //email validation
    if (!emailReg.test(email))
        return res
            .status(400)
            .json({ error: "please enter a valid email address." });

    //password validation
    if (password.length < 6)
        return res
            .status(400)
            .json({ error: "password must be atleast 6 characters long" });
    try {

        const doesUserAlreadyExist = await user.findOne({ email });

        if (doesUserAlreadyExist) return res.status(400).json({ error: `a user of same email id [${email}] exist! please use a different one.` })

        const hashedpass = await bcrypt.hash(password, 12);
        const newUser = new user({ name, email, password: hashedpass });

        //saving user prof
        const result = await newUser.save();

        result._doc.password = undefined;

        return res.status(201).json({ ...result._doc });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: e.message });


    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res
            .status(400)
            .json({ error: "please enter all the required fields!" });

    //email validation
    const emailReg =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailReg.test(email))
        return res
            .status(400)
            .json({ error: "please enter a valid email address." });

    try {
        const doesUserExits = await user.findOne({ email });

        if (!doesUserExits)
            return res.status(400).json({ error: "Invalid email or password!" });

        //if  user present but pass not match
        const doesPasswordMatch = await bcrypt.compare(
            password,
            doesUserExits.password
          );
      
          if (!doesPasswordMatch)
            return res.status(400).json({ error: "Invalid email or password!" });
      
          const payload = { _id: doesUserExits._id };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
      
          const usar = { ...doesUserExits._doc, password: undefined };
          return res.status(200).json({ token, usar });
        }catch (e) {
            console.log(e);
            return res.status(500).json({ error: e.message });
        }
    });

    router.get("/me", auth, async (req, res) => {
        return res.status(200).json({ ...req.usar._doc });
      });

module.exports = router;