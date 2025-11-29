import Users from '../models/mongo.js';
import { hashPassword } from '../config/password.js';
const renderRegister = (req, res) => res.render('register');

const handleRegisterUser = async (req, res) => {
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.render('register', { msg: 'Please fill in all the fields' });
  }

  try {
    const user = await Users.findOne({ email: email });

    if (user) {
      res.render('register', { msg: 'This user is already registered.' });
    } else {

      const hashedPassword = await hashPassword(password);

      const newUser = new Users({
        username,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();
      if (savedUser) {
        res.redirect('/login?success=Registration successful! Please log in.');
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).render('errors/oops');
  }
};

export { renderRegister, handleRegisterUser };
