const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator');
const { render } = require("ejs");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const fileUpload = require('express-fileupload');
const path = require('path');
const uid = require("uuid")
var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'logeshavan@student.tce.edu',
      pass: 'Logesh@2001'
    }
});

const app = express();
const port = 3000;

//session
let session;
let result;

//sql connection
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hagrocare"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected");
});

app.listen(port, () => {
    console.info("listening started");
});

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use(fileUpload());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: false }));


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(cookieParser());

//from req
// app.use(express.urlencoded({extended: false}));
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Set View's
app.set('views', './views');
app.set('view engine', 'ejs');

//pages
app.get("/", (req, res) => {
    res.render("home", {session: session});
});
app.get("/aboutustamil",(req,res) => {
    res.render("aboutdetails tamil", {session: session});
})
app.get("/home", (req, res) => {
    res.render("home", {session: session});
});
app.get("/about", (req, res) => {
    res.render("about", {session: session});
});
app.get("/services", (req, res) => {
    res.render("services", {session: session});
});
app.get("/contact", (req, res) => {
    res.render("contact", {session: session});
});
app.get("/login", (req, res) => {
    res.render("login", {session: session});
});
app.get("/registration", (req, res) => {
    res.render("registration", {session: session});
});
app.get("/farmer", (req, res) => {
    if (typeof req.session.user_id != 'undefined'){
        let query = `SELECT * FROM crops WHERE user_id = "${session.user_id}"`;
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("fetched");
            console.log(result);
            console.log(session.user_id);
            res.render("farmer", {"session" : session, result: result});
        });
    }
    else
        res.redirect("login");
});
app.get("/shopkeeper", (req, res) => {
    if (typeof req.session.user_id != 'undefined'){
        let query = `SELECT * FROM crops`;
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("fetched");
            console.log(result);
            console.log(session.user_id);
            res.render("shopkeeper", {"session" : session, result: result});
        });
    }
    else
        res.redirect("login");
});
app.get("/logout", (req, res) => {
    if (session)
        session.destroy();
    res.redirect("login");
});
app.get("/footer", (req, res) => {
    res.render("footer");
});
app.get("/details", (req, res) => {
    res.render("details", {result: result});
});
app.get("/order", (req, res) => {
    res.render("order");
});
app.get("/training", (req, res) => {
    let query = `SELECT * FROM training WHERE user_id = '${session.user_id}'`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.render("training", {result: result});
    });
});
app.get("/trainer", (req, res) => {
    let query = "SELECT * FROM training";
    connection.query(query, (err, result) => {
        if (err) throw err;
        res.render("trainer", {result: result});
    });
});
app.get("/aboutdetails", (req, res) => {
    res.render("aboutdetails"); 
});

//post requests
app.post("/registration", urlencodedParser, [
    check("username").isLength({ min: 3 }).withMessage("username must be 3+ characters long"),
    check("email", "please enter a valid email").isEmail().normalizeEmail(),
    check("password").isLength({min: 5}).withMessage("minimum length should be 5 characters"),
    check("confirm_password").custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('confirm password must be equal to password');
       }
       return true;
    })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        const alert = errors.array();
        console.log("errors");
        res.render("registration", {alert});
    }
    else{
        let username = req.body.username;
        let email = req.body.email;
        let password = await bcrypt.hash(req.body.password, 10);
        let role = req.body.role;

        let query = `INSERT INTO users (username, email, passwords, roles) VALUES ('${username}', '${email}', '${password}', '${role}')`;
        connection.query(query, (err, result) => {
            if (err) throw err;
            console.log("INSERTED");
            res.redirect("/login");
        });
    }
});
app.post("/login", urlencodedParser, [
    check("email", "please enter a valid email").isEmail().normalizeEmail()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        const alert = errors.array();
        console.log("errors");
        res.render("login", {alert});
    }
    else{
        let email = req.body.email;
        let password = req.body.password;
        let query = `SELECT * FROM users WHERE email = '${email}'`;
        connection.query(query, async (err, result) => {
            if (err) throw err;
            let comparison = await bcrypt.compare(password, result[0]["passwords"]);
            if (comparison){
                session = req.session;
                session.user_id = result[0]["user_id"];
                session.user_name = result[0]["username"];
                if (result[0]["roles"] == "farmer")
                    res.redirect("farmer");
                else
                    res.redirect("shopkeeper");
            }
            else{
                console.log("else");
                res.render("login", {alerter: "LOGIN FAILED"});
            }
        });
    }

});
app.post("/farmer",  urlencodedParser, (req, res) => {
    let uidname = uid.v1();
    let file = req.files.image;
    let image_name = uidname + file.name;
    let user_id = session.user_id;
    let crop_name = req.body.crop_name;
    let quantity =  parseInt(req.body.quantity);
    let cost = parseInt(req.body.cost);
    let description = req.body.description.trim();
    let query = `INSERT INTO crops (image, crop_name, quantity, cost, description, user_id) VALUES ('${image_name}', '${crop_name}', '${quantity}', '${cost}', '${description}', '${user_id}')`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("inserted");
    });
    file.mv("public/uploaded images/" + image_name, (err) => {
        if (err) throw err;
        console.log("image moved successfully");
        res.redirect("farmer");
    });
});
app.post("/farmerEnd",  urlencodedParser, (req, res) => {
    console.log("request came");
    let a = JSON.stringify(req.body);
    let l = a.split("$");
    let crop_id = parseInt(l[1]);

    let query = `DELETE FROM CROPS WHERE crop_id = '${crop_id}'`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("deleted");
    });
});
app.post("/shopEnd",  urlencodedParser, (req, res) => {
    let crop_id = req.body.inputer;
    let quantity = req.body.quantity;
    console.log(crop_id);
    console.log(quantity);
    let query = `SELECT * FROM CROPS WHERE crop_id = '${crop_id}'`;
    connection.query(query, (err, result1) => {
        if (err) throw err;
        console.log(result1);
        // result = result;
        // , {result: result1}
        result1[0].crop_name = result1[0].crop_name.toUpperCase();
        res.render("details", {result: result1, quantity: quantity});
        console.log("blaa");
    });
});
app.post("/placeOrder", urlencodedParser, (req, res) => {
    let shop_id = session.user_id;
    let crop_id = req.body.inputer;
    let quantity = req.body.quantity;
    let rec_email = "";
    let sender_email = "";
    let crop_name = "";
    let username = "";
    let query = `SELECT crop_name, user_id FROM crops WHERE crop_id = '${crop_id}'`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        let user_id = result[0].user_id;
        crop_name = result[0].crop_name;
        query = `SELECT email FROM users WHERE user_id = '${user_id}'`;
        connection.query(query, (err, result) => {
            if (err) throw err;
            rec_email = result[0].email;
            console.log(rec_email); 
            query = `SELECT username, email FROM users WHERE user_id = '${shop_id}'`;
            connection.query(query, (err, result) => {
            if (err) throw err;
            sender_email = result[0].email;
            username = result[0].username;
            console.log(sender_email); 
            let mailOptions = {
                from: "logeshavan@student.tce.edu",
                to: rec_email,
                subject: "ORDER REQUEST",
                text: `Greetings from Hagrocare. Hope you are doing fine\nHurray!!! You have received an Order and details have been given below\n\nVEGETABLE: ${crop_name}\nQUANTITY: ${quantity}\nCUSTOMER USERNAME: ${username}\nCUSTOMER EMAIL: '${sender_email}'\n\nIncase of any Queries, Reply to this message.\nThank You`
            };
        transporter.sendMail(mailOptions);
        res.render("order");
        });
        });
    });  
});

app.post("/train", (req, res) => {
    let org_name = req.body.org_name;
    let date = req.body.date;
    let time = req.body.time;
    let venue = req.body.venue;
    let contact = req.body.contact;

    let query = `INSERT INTO training (org_name, date, time, venue, contact, user_id) VALUES ('${org_name}', '${date}', '${time}', '${venue}', '${contact}', '${session.user_id}')`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("inserted");
    });
    query = `SELECT email FROM users WHERE user_id != '${session.user_id}'`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(result);
        for (let i in result){
            let mailOptions = {
                from: "logeshavan@student.tce.edu",
                to: result[i].email,
                subject: "TRAINING SESSION",
                text: `Greetings from Hagrocare. Hope you are doing fine\nA Training session has been organised and the Details are given below\n\ORGANISATION: ${org_name}\nDATE: ${date}\nTIME: ${time}\nVENUE: ${venue}\nCONTACT: ${contact}\n\nDon't miss this oppurtunity!!!\nThank You ;)`
            };
            transporter.sendMail(mailOptions);
        }
        res.redirect("training");
    });
});
app.post("/trainDelete",  urlencodedParser, (req, res) => {
    console.log("request came");
    let a = JSON.stringify(req.body);
    let l = a.split("$");
    let p_id = parseInt(l[1]);
    let query = `DELETE FROM training WHERE t_id = '${p_id}'`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("deleted");
    });
});
app.post("/contactEnd", urlencodedParser, (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let subject  = req.body.subject;

    let query = `INSERT INTO contact (name, email, subject) VALUES ('${name}', '${email}', '${subject}')`;
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log("inserted");
        res.redirect("contact");
    })
});