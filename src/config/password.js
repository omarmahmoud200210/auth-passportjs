import argon2 from 'argon2';

const hashPassword = async (password) => await argon2.hash(password);

const validPassword = async (password, hash) => await argon2.verify(hash, password);

export { hashPassword, validPassword };
