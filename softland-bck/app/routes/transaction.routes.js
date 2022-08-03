const { authJwt } = require("../middleware");
const transaction = require("../controllers/transaction.controller.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

   
    app.post("/" [authJwt.verifyToken], transaction.create);
  
    // Retrieve all Tutorials
    app.get("/:user_id" [authJwt.verifyToken], transaction.findAll);
  


};
  