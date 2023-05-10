const express = require('express');
const router = express.Router();
const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
} = require('../src/handler');

router.post('/books', addBookHandler);

router.get('/books', getAllBooksHandler);

router.get('/books/:id', getBookByIdHandler);

router.put('/books/:id', updateBookByIdHandler);

router.delete('/books/:id', deleteBookByIdHandler);

module.exports = router;