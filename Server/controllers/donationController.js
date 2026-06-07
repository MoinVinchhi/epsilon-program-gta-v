import User from '../models/User.js';
import Donation from '../models/Donation.js';

export const donationByUsername = async (req, res) => {
    const email = req.params.username;  // Ensure this matches the URL parameter
    const updatedPoints = req.body.points;
    const { addPoints } = req.body;

    try {
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (addPoints < 0) {
            return res.status(400).json({ error: 'Invalid amount, please enter a valid number' });
        }

        if (user.points < addPoints) {
            return res.status(400).json({ error: 'Insufficient balance' });
        } else {
            await new Donation({
                userId: user._id,
                amount: addPoints,
            }).save();

            const adminUser = await User.findOne({ name: 'admin' });
            if (adminUser) {
                adminUser.points = (adminUser.points || 0) + Number(addPoints);
                await adminUser.save();
            } else {
                console.error('Admin user not found');
            }

            user.points = updatedPoints;
            const updatedUser = await user.save();
            res.json({ user: updatedUser, admin: adminUser });
        }
    } catch (error) {
        console.error('Error in donationByUsername:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const totalDonations = async (req, res) => {
    try {
        const totalDonations = await Donation.aggregate([
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        res.json({ total: totalDonations.length > 0 ? totalDonations[0].total : 0 });
    } catch (error) {
        console.error('Error fetching total donations:', error);
        res.status(500).json({ error: 'Unable to fetch total donations' });
    }
};

export const userDonation = async (req, res) => {
    try {
        const userDonations = await Donation.aggregate([
            { 
                $group: {
                    _id: '$userId', // Group by userId
                    totalDonations: { $sum: '$amount' } // Calculate total donations for each user
                }
            },
            {
                $lookup: {
                    from: 'users', // Name of the collection for User model
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $unwind: '$user' }, // Unwind the user array to get individual user documents
            {
                $project: {
                    _id: 0, // Exclude the _id field
                    username: '$user.name', // Include username
                    totalDonations: 1 // Include total donations
                }
            }
        ]);

        res.json({ userDonations });
    } catch (error) {
        console.error('Error fetching user donations:', error);
        res.status(500).json({ error: 'Unable to fetch user donations' });
    }
};
