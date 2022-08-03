const { authJwt } = require("../middleware");
const tutorials = require("../controllers/tutorial.controller.js");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", [authJwt.verifyToken], controller.allAccess);

 app.post("/" [authJwt.verifyToken], tutorials.create);

  // Retrieve all Tutorials
  app.get("/" [authJwt.verifyToken], tutorials.findAll);

  // Retrieve all published Tutorials
  app.get("/published" [authJwt.verifyToken],tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  app.get("/:id" [authJwt.verifyToken], tutorials.findOne);

  // Update a Tutorial with id
  app.put("/:id" [authJwt.verifyToken], tutorials.update);

  // Delete a Tutorial with id
  app.delete("/:id" [authJwt.verifyToken], tutorials.delete);

  // Delete all Tutorials
  app.delete("/" [authJwt.verifyToken], tutorials.deleteAll);


};
