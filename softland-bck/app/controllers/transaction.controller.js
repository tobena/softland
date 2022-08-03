const db = require("../models");
const Transaction = db.transaction;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if ((!req.body.fromAddress||!req.body.toAddress)) {
      res.status(400).send({
        message: "Transactions cant be  empty!"
      });
      return;
    }
  
    // Create a Tutorial
    const transaction = {
      currency: req.body.currency,
      fromAddress: req.body.description,
      toAddress: req.body.published ? req.body.published : false,
      amount: req.body.title,
      userId: req.body.description
      
    };
  
    // Save Transaction in the database
    Transaction.create(transaction)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      });
  };

  exports.findAll = (req, res) => {
    const userId = req.query.userId;
    var condition = userId ? { userId: { [Op.like]: `%${userId}%` } } : null;
  
    Transaction.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving transactions."
        });
      });
  };