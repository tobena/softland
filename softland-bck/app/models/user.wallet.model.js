module.exports = (sequelize, Sequelize) => {
    const Wallet = sequelize.define("users_wallet", {
      userid: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      }
    });
  
    return Wallet;
  };