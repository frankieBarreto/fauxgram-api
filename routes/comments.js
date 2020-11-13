// imports
const router = require("express").Router();
const ctrl = require("../controllers");
const authRequired = require("../middleware/authRequired");
// routes
router.get("/", ctrl.comments.index);
router.get("/:id", ctrl.comments.show);
router.post("/", authRequired, ctrl.comments.create);
router.put("/:id", authRequired, ctrl.comments.update);
router.delete("/:id", authRequired, ctrl.comments.destroy);

// exports
module.exports = router;
 