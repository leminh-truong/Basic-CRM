/*
Created Date: 2021.09.01 by Le Minh Truong
Modified on: 2021.09.22 by Le Minh Truong - change module from Nodemailer to Mailgun
Brief Introduction: This backend function enables the app to send emails to a predetermined
list of recipients (this can be changed to any recipients if the Mailgun plan is upgraded)
*/

require('dotenv').config()
const API_KEY = process.env.API_KEY;
const DOMAIN = 'sandbox58837afec67b4f27939b3a02f5724f80.mailgun.org';
const MAILGUN = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});


const sendEMail = async(req,res) => {
    try{
        console.log(req)

        if(req.files[0]){
            var newfile = new MAILGUN.Attachment({data: req.files[0].buffer, filename: req.files[0].originalname});
        }
        
        var data = {
            from: req.body.sender, // Domain must follow the example: sth@sandbox58837afec67b4f27939b3a02f5724f80.mailgun.org
            to: req.body.receiver, // Sender MUST BE ADDED to Mailgun verified recipient list to receive the email
            subject: req.body.subject,
            text: req.body.message,
        };

        if(req.files[0]){
            data["attachment"] = newfile;
        }
        
        console.log(data);
        
        MAILGUN.messages().send(data, function (error, body) {
            res.send("Done");
        });
    }
    catch{
        res.status(400)
        res.send(err)
    }
}

module.exports = {sendEMail}