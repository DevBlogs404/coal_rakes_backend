const jwt = require("jsonwebtoken");

async function authMiddleWare(req, res, next) {
  const authCookie = req.cookies.auth_cookie;
  if (authCookie) {
    try {
      const data = jwt.verify(authCookie, process.env.JWT_SECRET);
      if (data) {
        req.id = authCookie;
        return next();
      }
    } catch (error) {
      return res.sendStatus(403);
    }
  }
}

module.exports = authMiddleWare;
