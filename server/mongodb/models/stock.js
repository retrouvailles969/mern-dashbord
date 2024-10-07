import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  kode: { type: String, required: true },
  item: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  actual: { type: Number, required: true },
  photo: { type: String, required: true },
  auditor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const stockModel = mongoose.model('Stock', StockSchema);

export default stockModel;