import jwt from 'jsonwebtoken';

const renderLogin = (req, res, next) => {
  const error = req.query.error;
  const success = req.query.success;
  res.render('login', { 
    error: error ? decodeURIComponent(error) : undefined,
    success: success ? decodeURIComponent(success) : undefined
  });
}

const postLogin = (req, res) => {
  if (!req.user) return res.redirect(`/login`);

  const user = req.user;

  const payload = {
    sub: user._id,
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

export { renderLogin, postLogin };
