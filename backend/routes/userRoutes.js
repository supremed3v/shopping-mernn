const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserProfile,
  updatePassword,
  updateProfile,
  allUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, authorizedRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, getUserProfile);
router.route("/me/update").put(isAuthenticated, updateProfile);
router.route("/password/update").put(isAuthenticated, updatePassword);
router
  .route("/admin/users")
  .get(isAuthenticated, authorizedRoles("admin"), allUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizedRoles("admin"), getUserProfile)
  .put(isAuthenticated, authorizedRoles("admin"), updateUser)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteUser);

module.exports = router;

// 3:47:00
