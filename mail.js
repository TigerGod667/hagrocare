var nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'logeshavan@student.tce.edu',
      pass: 'Logesh@2001'
    }
});
let mailOptions = {
    from: "logeshavan@student.tce.edu",
    to: "logeshavanayyalu@gmail.com",
    subject: "ORDER REQUEST",
    text: `Greetings from Hagrocare. Hope you are doing fine\nHurray!!! You have received an Order and details have been given below\n\nVEGETABLE: \nQUANTITY: \nCUSTOMER USERNAME: \nCUSTOMER EMAIL: \n\nIncase of any Queries, Reply to this message.\nThank You`
};
transporter.sendMail(mailOptions);