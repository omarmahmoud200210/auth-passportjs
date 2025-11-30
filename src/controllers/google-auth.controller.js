import jwt from 'jsonwebtoken';

const googleCallback = (req, res) => {
  if (!req.user) return res.redirect('/login?error=Google Auth Failed');

  const payload = {
    sub: req.user._id,
    iat: Date.now(),
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

  res.redirect('/dashboard');
};

export { googleCallback };
