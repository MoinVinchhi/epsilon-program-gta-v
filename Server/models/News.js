import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }, // URL to the image
    createdAt: { type: Date, default: Date.now },
});
  
const News = mongoose.model('News', newsSchema);

export default News;