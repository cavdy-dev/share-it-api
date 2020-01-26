import bcrypt from 'bcryptjs';

export const hashPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = async (password, dbPassword) => {
  const res = await bcrypt.compare(password, dbPassword);
  return res;
};
