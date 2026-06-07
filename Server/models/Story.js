import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
    username: String,
    story: String,
    image: String,  
    date: { type: Date, default: Date.now }
});
  
const Story = mongoose.model('Story', storySchema);

export default Story;