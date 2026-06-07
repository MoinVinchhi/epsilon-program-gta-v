import jwt from 'jsonwebtoken';

export const checkToken = async (req, res,next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      console.log(decoded);
    } catch (error) {
      console.error('Error during user retrieval', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    return next();
};