require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const User = require("./model/user.model");
const Note = require("./model/note.model");
const auth = require("./middleware/auth");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};
  
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

/**
 * AUTH MIDDLEWARE
 */
// Register
app.post("/register", async (req, res) => {
    try {
        // Get user input
        const { first_name, last_name, email, password } = req.body;
        
        // Validate user input
        if (!(email && password && first_name && last_name)) {
            res.status(400).send("All input is required");
        }

        // Check for existing account with same email
        var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};
        const oldUser = await User.find(condition).then(data => data[0]);

        if (oldUser) {
            return res.status(409).send({message: "User Already Exist. Please Login"});
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in database
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(), 
            password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        // Validate if user exist in our database
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
            );
    
            // save user token
            user.token = token;
    
            // user
            res.status(200).json(user);
        } else {
            res.status(400).send({message: "Invalid Credentials"});
        }
    } catch (err) {
        console.error(err);
    }
});
  
app.get("/welcome", auth, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
});

/**
 * NOTES MIDDLEWARE
 */
app.post("/notes", async (req, res) => {
    try {
        const {email} = req.body;
        // Validate if user exist in our database
        if(email !== undefined) {
            var condition = email ? { author: { $regex: new RegExp(email), $options: "i" } } : {};
            Note.find(condition)
            .then((data) => {
                res.status(200).send(data);
            })
            .catch(err => {
                res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving notes."
                });
            });
        } else {
            res.status(400).send({message: "Author undefined"});
        }
        
    } catch (err) {
        console.error(err);
    }
});

app.post("/notes/new", async (req, res) => {
    // Get user input
    const { title, content, author } = req.body;
    const token = req.headers["x-access-token"];
    // Validate user input
    if (!(title && content && author && token)) {
        res.status(400).send("All input is required ");
    }

    // Create a Note
    const note = new Note({
        title: title,
        content: content,
        author: author,
    });
 
    // Save User in the database
    note
    .save(note)
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the note."
        });
    });
});

app.put("/notes/update", async (req, res) => {
    try {
        const {_id} = req.body;
        // Validate if note exist in database
        if(_id !== undefined) {
            Note.findByIdAndUpdate(_id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                res.status(404).send({
                    message: `Cannot update note with id=${_id}. Maybe note was not found!`
                });
                } else res.send({ message: "note was updated successfully." });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating note with id=" + _id
                });
            });
        } else {
            res.status(400).send({message: "_id undefined"});
        }
        
    } catch (err) {
        console.error(err);
    }
});

app.use("*", (req, res) => {
    res.status(404).json({
        success: "false",
        message: "Page not found",
        error: {
        statusCode: 404,
        message: "You reached a route that is not defined on this server",
        },
    });
});

module.exports = app;
