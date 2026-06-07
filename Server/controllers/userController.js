import User from '../models/User.js';


export const getAllUsers =  async (req, res) => {
    try {
      const users = await User.find()
      res.status(200).json(users);
    } catch (error) {
      console.error('Error retrieving users', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
  //find one particular user 
export const getUserByEmail =  async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
};
  
export const updateUserByEmail =  async (req, res) => {
    const email = req.params.email;
    const userPoints = req.body.points;
    const addPoints = Number(req.body.addPoints); // Ensure it's a number
    const membership_id = Number(req.body.membership_id); // Ensure it's a number
  
    try {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Validate points based on membership_id
      let errorResponse;
      if (membership_id === 1 && userPoints < 10) {
        errorResponse = { error: 'User must have at least 10 points for membership ID 1' };
      } else if (membership_id === 2 && userPoints < 20) {
        errorResponse = { error: 'User must have at least 20 points for membership ID 2' };
      } else if (membership_id === 3 && userPoints < 30) {
        errorResponse = { error: 'User must have at least 30 points for membership ID 3' };
      }
  
      if (errorResponse) {
        return res.status(400).json(errorResponse);
      }
  
      // Check admin user
      const adminUser = await User.findOne({ name: 'admin' });
      if (!adminUser) {
        return res.status(404).json({ error: 'Admin user not found' });
      }
      
      
      // Update points and membership ID
      adminUser.points += addPoints;
      await adminUser.save();
  
      user.membership_id = membership_id;
      user.points -= addPoints;
      const updatedUser = await user.save();
  
      res.json({ user: updatedUser, admin: adminUser });
  
    } catch (error) {
      console.error('Internal server error:', error); // Detailed error log
      res.status(500).json({ error: 'Internal server error' });
    }
};