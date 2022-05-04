const express = require("express");
const {
  getAllContacts,
  getContactDetails,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/contacts").get(getAllContacts);

router.route("/contact/:id").get(getContactDetails);

router.route("/contact/new").post(createContact);

router
  .route("/admin/contact/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getContactDetails)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateContact)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteContact);

module.exports = router;
