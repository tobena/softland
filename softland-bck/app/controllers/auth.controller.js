const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Activity = db.activity;
const Wallet = db.wallet;
const PasswordReset = db.passwordReset;
const Middleware = require("../middleware");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          //log activity

          Activity.create({
            action: "REGISTERED ",
            user: req.body.username
          });
          Middleware.notification.sendWelcomeMessage(user.email);

          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.updatePassword = (req, res) => {

  const resetid = req.body.resetid;
  const resetcode = req.body.resetcode;
  const newpassword = req.body.password;
  // Save User to Database
  PasswordReset.findOne({
    where: {
      id: resetid,
      resetcode: resetcode
    }
  }).then(passwordreset => {
    if (passwordreset) {
      User.findOne({
        where: {
          email: passwordreset.email
        }
      }).then(user => {
        if (user) {
          user.update({
            password: bcrypt.hashSync(newpassword, 8)
          }).then(() => {
            passwordreset.update({
              used: true
            })
            Middleware.notification.logPasswordChangedActivity(user.id)
            Middleware.notification.sendPasswordChangeSuccesfullMessage(passwordreset.email);
            res.send({ message: "password changed successfully " });

          })

        }
      }
      )
    } else {

      res.status(500).send({ message: "error while changing password" });
    }
  })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};


exports.updateUser = (req, res) => {

  const userid = req.body.userid;
  const walletAddress = req.body.walletAddress;
  const currentUser = req.body.currentUser;

  // find the  wallet with userId
  Wallet.findOne({
    where: {
      userid: userid
    }
  }).then(foundWallet => {

    if (foundWallet) {
      console.log("******* wallet found  *********** " + foundWallet.id);
      foundWallet.update({
        address: walletAddress
      }).then(() => {
        //res.send({ message: " success " });
        res.status(200).send({ message: " success " });

      })

    } else {
      console.log("******* wallet not found  *********** ");
      Wallet.create({
        userid: userid,
        address: walletAddress
      }).then(newWallet => {
  
        if(newWallet){
          //res.send({ message: " success " });
          res.status(200).send({ message: " success " });
        }
      
      })

    }

  }
  ).catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.refreshUser = (req, res) => {
  console.log("******* am refreshing user *********** ");
  const currentUser = req.body.currentUser


  User.findOne({
    where: {
      id: currentUser.id

    }
  }).then(user => {

    var token = currentUser.token;
    var wallet_address = "";

    var authorities = [];
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }

      //get the user crypto wallet 
      Wallet.findOne({
        where: {
          userid: user.id
        }
      }).then(wallet => {
        if (wallet) {
          wallet_address = wallet.address;
        }
        let refreshedUser ={
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
          walletAddress: wallet_address

        };
        console.log("******* I refreshed user *********** ");
        res.status(200).send(refreshedUser);
      })

    });
  })
    .catch(err => {
      console.log("******* I could not refresh user *********** ");
      res.status(500).send({ message: err.message });
    });
}

exports.forgotPassword = (req, res) => {
  // check if emil exist before implementing
  const resetcode = Middleware.utilities.generateString();

  PasswordReset.create({
    email: req.body.email,
    resetcode: resetcode,
    used: false,
    emailsent: ""

  }).then(passwordReset => {
    if (passwordReset) {

      Middleware.notification.logPasswordResetActivity(user.id);
      Middleware.notification.sendPassWordResetMail(passwordReset);
      res.send({ message: "If Email is present check our email for instructions" });
    }
  }
  ).catch(err => {
    res.status(500).send({ message: err.message });
  });
};


exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var wallet_address = "";

      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        //get the user crypto wallet 
        Wallet.findOne({
          where: {
            userid: user.id
          }
        }).then(wallet => {
        
          if (wallet) {
            console.log("*******i fetched wallet during login *********** " + wallet.address);
            wallet_address = wallet.address;
          }
          console.log("******* wallet am adding to user object *********** " + wallet_address);
          //log activity

          Middleware.notification.logLoginActivity(user.id);
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
            walletAddress: wallet_address

          });
        })

      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
