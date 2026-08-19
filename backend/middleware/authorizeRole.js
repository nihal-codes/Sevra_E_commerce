const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You are not allowed to do that!"
      })
    }
    next();
  }
}

module.exports = authorizeRole;