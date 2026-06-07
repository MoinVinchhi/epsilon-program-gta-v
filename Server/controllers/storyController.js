import Story from '../models/Story.js';
import User from '../models/User.js'; // Import if needed

export const getStories = async (req, res) => {
    try {
      const stories = await Story.find()
      .populate('username', 'image name') // Populate userId with user's image and name
      .sort({ date: -1 });   
      res.json(stories);
    } catch (error) {
      console.error('Error fetching stories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
  // Endpoint to add a new story
export const addStory = async (req, res) => {
    const { username, story } = req.body;
    if (!username || !story) {
      return res.status(400).json({ error: 'Username and story are required' });
    }
    try {
      const userData = await User.findOne({name: username});
      console.log(userData);
      const imageLink = userData.image;
      const newStory = new Story({ username, story, image: imageLink });
      const savedStory = await newStory.save();
      res.status(201).json(savedStory);
    } catch (error) {
      console.error('Error adding story:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};

// Endpoint to remove a story
export const removeStory = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const story = await Story.findById(id);

    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    if (story.username !== username) {
      return res.status(403).json({ error: 'Unauthorized to delete this story' });
    }

    await Story.findByIdAndDelete(id); // Use findByIdAndDelete to remove the story
    res.status(200).json({ message: 'Story removed successfully' });
  } catch (error) {
    console.error('Error removing story:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};