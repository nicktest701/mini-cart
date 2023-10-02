const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];

  if (token == null) {
    console.log("2");
    return res.status(401).json("Unauthorided Access");
  }

  jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json("Forbidden");
    }

    req.user = user;
    next();
  });
};
module.exports = protect;
