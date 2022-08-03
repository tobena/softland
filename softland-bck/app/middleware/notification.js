var nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const notificationconfig = require("../config/notification.config");
const db = require("../models");
const Activity = db.activity;

var transporter = nodemailer.createTransport({
  host: notificationconfig.host,
  port: notificationconfig.port,
  secure: false,
  auth: {
    user: notificationconfig.username,
    pass: notificationconfig.password
  }
});


function sendPasswordChangeSuccesfullMessage(email) {

  var mailOption = {
    from: '"softland" <donotreply@benjaminagboola.tech>',
    to: email,
    subject: "Password Reset Succesfull ",
    text: "Password Updated Successfully",


  }
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log("***********" + error);
    } else {
      console.log('*********Email sent:********' + info.response);
    }
  });

}

function logLoginActivity(userId) {

  Activity.create({
    action: "LOGIN ",
    userid: userId
  });

}

function logPasswordResetActivity(userId) {

  Activity.create({
    action: "PASSWORD RESET ",
    user: userId
  });

}

function logPasswordChangedActivity(userId) {

  Activity.create({
    action: "PASSWORD CHANGED ",
    user: userId
  });

}

function sendWelcomeMessage(email) {

  var mailOption = {
    from: '"softland" <donotreply@benjaminagboola.tech>',
    to: email,
    subject: "Welcome to SOFTLAND",
    text: "Wellcome",


  }
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log("***********" + error);
    } else {
      console.log('*********Email sent:********' + info.response);
    }
  });

}
function sendPassWordResetMail(passwordReset) {
  console.log('*********passwordreset:********' + JSON.stringify(passwordReset));
  const id = passwordReset.id;
  const code = passwordReset.resetcode;
  const resetUrl = notificationconfig.baseurl + "newpassword/?resetid=" + id + "&resetcode=" + code + "";

  console.log('*********url :********' + resetUrl);
  const mailBody = "<html>\n" +
    "    <body>\n" +
    "       <p> <h3><a href=" + resetUrl + ">Reset Your Password!</a></h3></p>\n" +
    "    </body>\n" +
    "</html>";

  var mailOption = {
    from: '"softland" <donotreply@benjaminagboola.tech>',
    to: passwordReset.email,
    subject: "Password Reset",
    html: mailBody, // html body

  }
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log("***********" + error);
    } else {
      console.log('*********Email sent:********' + info.response);
    }
  });


};

const notification = {
  sendPassWordResetMail,
  sendPasswordChangeSuccesfullMessage,
  sendWelcomeMessage,
  logLoginActivity,
  logPasswordResetActivity,
  logPasswordChangedActivity
};

module.exports = notification;