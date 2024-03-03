const jwt = require('jsonwebtoken');
const User = require('../model/User');
 

const generateAccessToken = (userId) => {
  const secretKey = 'markship';
  const expiresIn = '1d';
  return jwt.sign({ userId }, secretKey, { expiresIn });
};

 


   const authenticateToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');
  
    if (!authHeader) {
      return res.status(401).json({ error: 'Access denied. Token not provided.' });
    }
  
    const token = authHeader.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ error: 'Access denied. Invalid token format.' });
    }
  
    try {

    jwt.verify(token, "markship",(err,authData)=>{
         if (err) {
           return res.status(404).send({
            success: false,
            msg: "Invalid Token...",
          });
        } else {
           req.userId = authData.userId,
           req.user=authData.user
            next(); 
        }
      })
       
       
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'jwt_expired' });}
      else
      return res.status(403).json({ error: 'Invalid token.' });
    }
  };
  
 

const refreshAccessToken = async (refreshToken) => {
  try {
    const decodedRefreshToken = jwt.verify(refreshToken, 'les_refresh_secret_key');
    const user = await User.findByPk(decodedRefreshToken.userId);

    if (!user) {
      throw new Error('Invalid refresh token');
    }

    const validRefreshToken = await RefreshTokenModel.findOne({
      where: { user_id: decodedRefreshToken.userId, token: refreshToken },
    });

    if (!validRefreshToken) {
      throw new Error('Invalid refresh token');
    }

    const newAccessToken = generateAccessToken(user.id);
    validRefreshToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await validRefreshToken.save();

    return newAccessToken;
  } catch (error) {
     return null;
  }
};

function checkSuperAdmin(req, res, next) {
   const user = req.user;
    if (user && user.role === 'ADMIN') {
     next();
  } else {
     res.status(403).json({ message: 'Permission denied.' });
  }
}
 
module.exports = { authenticateToken ,refreshAccessToken,checkSuperAdmin };
