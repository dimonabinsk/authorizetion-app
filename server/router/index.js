const Router = require("express").Router;
const { body } = require("express-validator");

const {
  registration,
  login,
  logout,
  activate,
  refresh,
  getUsers,
} = require("../controllers/user-controller");

const authMiddleware = require("../middlewares/auth-middleware");


const router = new Router();

router.post("/registration", body("email").isEmail(), body("password").isLength({min:5, max: 12}), registration);
router.post("/login", login);
router.post("/logout", logout);

router.get("/activate/:link", activate);
router.get("/refresh", refresh);
router.get("/users", authMiddleware, getUsers);

module.exports = router;
