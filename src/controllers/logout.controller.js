const handleLogout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies) return res.sendStatus(204);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
  res.redirect('/login');
};

export { handleLogout };
