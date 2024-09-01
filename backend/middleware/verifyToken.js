const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  //console.log("backend",req.headers.authorization);
  if (!token) {
    return res.json({ msg: 'token not found' });
  }
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET , (err, decoded) => {
    if (err) {
      return res.json({ msg: 'Invalid token' });
    }
    req.user = decoded;
    // this returns the data which we have stored during the login time , when verifiaction is successful
    next();
  });
};

module.exports = verifyToken;
