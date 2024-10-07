import express from 'express';

import {
  createStock, deleteStock, getAllStocks, getStockDetail, updateStock
} from '../controllers/stock.controller.js'

const router = express.Router();

router.route('/').get(getAllStocks);
router.route('/:id').get(getStockDetail);
router.route('/').post(createStock);
router.route('/:id').patch(updateStock);
router.route('/:id').delete(deleteStock);

export default router;