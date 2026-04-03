const express = require("express");
const { createNewRole,
      updateRole,
  deleteRole
 } = require("../Controller/rolecontroller");

const roleRouter = express.Router();

roleRouter.post("/create", createNewRole);
roleRouter.put("/roles/:id", updateRole);
roleRouter.delete("/roles/:id", deleteRole);
module.exports = roleRouter;