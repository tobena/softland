module.exports = (sequelize, Sequelize) => {
    const Activity = sequelize.define("activity_log", {
      
      action: {
        type: Sequelize.STRING
      },
      userid: {
        type: Sequelize.INTEGER
      },
      

    });
  
    return Activity;
  };
  