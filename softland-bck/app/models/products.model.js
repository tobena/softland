module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define("products", {
        name: {
            type: Sequelize.STRING
        },
        fullname: {
            type: Sequelize.STRING
        },
        wallet: {
            type: Sequelize.STRING
        },
        keyhash: {
            type: Sequelize.STRING
        },
        blockchaintype: {
            type: Sequelize.STRING
        },
        ownerid: {
            type: Sequelize.INTEGER
        },
        disabled: {
            type: Sequelize.BOOLEAN
        },
        approved: {
            type: Sequelize.BOOLEAN
        },
    });

    return Products;
};