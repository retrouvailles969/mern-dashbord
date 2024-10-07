import Property from '../mongodb/models/stock.js';
import User from '../mongodb/models/user.js';

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllStocks = async (req, res) => {
  const { _end, _order, _start, _sort, title_like = "", category = "" } = req.query;

  const query = {};

  if(category !== '') {
    query.category = category;
  }

  if(title_like) {
    query.title = { $regex: title_like, $options: 'i' };
  }

  try {
    const count = await Stock.countDocuments({ query });

    const stocks = await Stock
      .find(query)
      .limit(_end)
      .skip(_start)
      .sort({ [_sort]: _order })

    res.header('x-total-count', count);
    res.header('Access-Control-Expose-Headers', 'x-total-count');

    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message }) 
  }
};

const getStockDetail = async (req, res) => {
  const { id } = req.params;
  const stockExists = await Stock.findOne({ _id: id }).populate('creator');

  if(stockExists) {
    res.status(200).json(stockExists) 
  } else {
    res.status(404).json({ message: 'Stock not found' });
  }
};

const createStock = async (req, res) => {
  try {
    const { kode, item, description, category, location, actual, photo, email } = req.body;
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    const user = await User.findOne({ email }).session(session);
  
    if(!user) throw new Error('User not found');
  
    const photoUrl = await cloudinary.uploader.upload(photo);
  
    const newProperty = await Property.create({
      kode,
      item,
      description,
      category,
      location,
      actual,
      photo: photoUrl.url,
      creator: user._id
    });
  
    user.allStocks.push(newProperty._id);
    await user.save({ session });
  
    await session.commitTransaction();
  
    res.status(200).json({ message: 'Stock created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message }) 
  }
};

const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { kode, item, description, category, location, actual, photo } = req.body;

    const photoUrl = await cloudinary.uploader.upload(photo);

    await Property.findByIdAndUpdate({ _id: id}, {
      kode,
      item,
      description,
      category,
      location,
      actual,
      photo: photoUrl.url || photo
    })

    res.status(200).json({ message: 'Stock updated successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};


const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    
    const stockToDelete = await Property.findById({ _id: id}).populate('creator');

    if(!stockToDelete) throw new Error('Stock not found');

    const session = await mongoose.startSession();
    session.startTransaction();
    
    stockToDelete.remove({session});
    stockToDelete.creator.allProperties.pull(stockToDelete);

    await stockToDelete.creator.save({session});
    await session.commitTransaction();

      res.status(200).json({ message: 'Stock deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

export {
  getAllStocks,
  getStockDetail,
  createStock,
  updateStock,
  deleteStock,
}