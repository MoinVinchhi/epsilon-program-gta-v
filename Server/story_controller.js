const stories = []; // This should be replaced with a proper database

const getAllStories = (req, res) => {
  res.json(stories);
};

const addStory = (req, res) => {
  const { username, story } = req.body;
  const newStory = { id: stories.length + 1, username, story, date: new Date() };
  stories.push(newStory);
  res.status(201).json(newStory);
};

module.exports = { getAllStories, addStory };
