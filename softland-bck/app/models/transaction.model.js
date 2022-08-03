module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        currency: {
            type: Sequelize.STRING
        },
        fromAddress: {
            type: Sequelize.STRING
        },
        toAddress: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.FLOAT
        }, 
        userId: {
            type: Sequelize.INTEGER
        }
    });

    return Transaction;
};