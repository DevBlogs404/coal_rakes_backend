const jwt = require("jsonwebtoken");

async function authMiddleWare(req, res, next) {
  const authCookie = req.cookies.auth_cookie;
  // console.log(authCookie);
  if (!authCookie) {
    return res.sendStatus(403);
  }
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

module.exports = authMiddleWare;
