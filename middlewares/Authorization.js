const authorize = (requiredPermission) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id).populate("role");

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const hasPermission = user.role.permissions.includes(requiredPermission);

            if (!hasPermission) {
                return res.status(403).json({ message: "Access denied" });
            }

            next();
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    };
};