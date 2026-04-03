const Role = require("../models/RoleSchema");

const createNewRole = async (req, res) => {
  try {
    const { name, permissions } = req.body;

    if (!name || !permissions) {
      return res.status(400).json({
        message: "required data from body",
      });
    }

    const role = await Role.create({
      name,
      permissions,
    });

    res.status(201).json({
      message: "New role was created",
      data: role,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findByIdAndDelete(id);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    res.status(200).json({
      message: "Role deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, permissions } = req.body;

    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    if (name) role.name = name;
    if (permissions) role.permissions = permissions;

    await role.save();

    res.status(200).json({
      message: "Role updated successfully",
      data: role,
    });
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
      err: err.message,
    });
  }
};

module.exports = {
  createNewRole,
  deleteRole,
  updateRole,
};
