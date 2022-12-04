const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) res.status(403).json("Token is not vaild");
      req.user = user;
      next();
    });
  } else {
    res.status(500).json("You are not atthenticated!");
  }
}

module.exports = verify;
