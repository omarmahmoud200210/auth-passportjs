import Users from '../models/mongo.js';
import jwt from 'jsonwebtoken';
import { hashPassword } from '../config/password.js';

const renderResetPasswordPage = async (req, res) => {
  const { token } = req.query;
  const user = await Users.findOne({ resetToken: token });

  if (!user) {
    return res.status(404).render('errors/404');
  }

  res.render('reset-password', { token, error: null });
};

const handleResetPassword = async (req, res) => {
  const { token } = req.query;
  const user = await Users.findOne({ resetToken: token });

  if (!user) {
    return res.status(404).render('errors/404');
  }

  try {
      const validRefreshToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const { newPassword, confirmPassword } = req.body;
      const hashedPssword = await hashPassword(newPassword);
      
      if (newPassword !== confirmPassword) {
        return res.render('reset-password', {
          token,
          error: 'Passwords do not match',
        });
      }
      else {
        user.password = hashedPssword;
        user.resetToken = null;
        await user.save();
        res.redirect('/login');
      }
    }
    catch (err) {
        return res.render('expired');
    }
};

export { renderResetPasswordPage, handleResetPassword };
