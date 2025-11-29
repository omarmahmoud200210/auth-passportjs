import jwt from 'jsonwebtoken';

const handelRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) return res.status(401).render('errors/401');

  const refreshToken = cookies.refreshToken;

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decode) => {
    if (err) return res.status(403).render('errors/403');

    const payload = {
      sub: decode.sub,
      iat: Date.now()
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });
    
    res.cookie('accessToken', accessToken, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });
    
    res.json({ success: true });
  });
};

export default handelRefreshToken;
