module.exports = (sequelize, Sequelize) => {
    const PasswordReset = sequelize.define("passwordReset", {
        email: {
            type: Sequelize.STRING
        },
        resetcode: {
            type: Sequelize.STRING
        },
        used: {
            type: Sequelize.BOOLEAN
        }, 
        emailsent: {
            type: Sequelize.STRING
        }
    });

    return PasswordReset;
};