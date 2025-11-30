import Users from '../models/mongo.js';
import jwt from 'jsonwebtoken';

const renderForgetPasswordPage = (req, res) => {
  res.render('forget-password');
};

const handelForgetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    return res.status(404).render('errors/404');
  }

  else if (user.password === "") {
    return res.status(400).render('errors/400');
  }
    
  else {
      const payload = {
          email: user.email,
          username: user.username,
          id: user._id,
      };
      
      const resetToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: '10m',
      });

      user.resetToken = resetToken;
      await user.save();

      res.cookie('resetToken', resetToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
      });

    res.redirect(`/reset-password?token=${resetToken}`);
  }
};

export { renderForgetPasswordPage, handelForgetPassword };
