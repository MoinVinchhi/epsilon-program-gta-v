import News from '../models/News.js';

export const addNews = async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json(news);
  } catch (error) {
    console.error('Error creating news:', error);  // Log the error
    res.status(400).json({ error: 'Error creating news', details: error.message });
  }
};

  
  // Get all news items
export const getNews = async (req, res) => {
    try {
      const news = await News.find().sort({ createdAt: -1 });
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching news' });
    }
};
  
  // Update a news item
export const updateNews =  async (req, res) => {
    try {
      const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(news);
    } catch (error) {
      res.status(400).json({ error: 'Error updating news' });
    }
};
  
  // Delete a news item
export const deleteNews = async (req, res) => {
    try {
      await News.findByIdAndDelete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting news' });
    }
};