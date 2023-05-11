const response = require('./utils/response');
const filteredBooks = require('./utils/filteredBooks');
const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  const id = nanoid(8);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const book = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (!name) {
    response(400, 'fail', { message: 'Gagal menambahkan buku. Mohon isi nama buku' }, res);
  } else if (readPage > pageCount) {
    response(400, 'fail', { message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' }, res);
  } else {
    books.push(book);
    response(201, 'success', { message: 'Buku berhasil ditambahkan', data: { bookId: id } }, res);
  }
};

const getAllBooksHandler = (req, res) => {
  const { name, reading, finished } = req.query;

  if (name) {
    const filterByName = books.filter((book) => name.toLowerCase().split('').every((e) => book.name.toLowerCase().includes(e)));
    const result = filteredBooks(filterByName);
    response(200, 'success', { data: { books: result } }, res);
  } else if (reading) {
    const filterByReading = books.filter((book) => book.reading === Boolean(Number(reading)));
    const result = filteredBooks(filterByReading);
    response(200, 'success', { data: { data: result } }, res);
  } else if (finished) {
    const filterByFinished = books.filter((book) => book.finished === Boolean(Number(finished)));
    const result = filteredBooks(filterByFinished);
    response(200, 'success', { data: { data: result } }, res);
  } else {
    const result = filteredBooks(books);
    response(200, 'success', { data: { books: result } }, res);
  }
};

const getBookByIdHandler = (req, res) => {
  const bookId = req.params.id;
  const book = books.find((item) => item.id === bookId);

  if (book !== undefined) {
    response(200, 'success', { data: { book } }, res);
  } else {
    response(404, 'fail', { message: 'Buku tidak ditemukan' }, res);
  }
};

const updateBookByIdHandler = (req, res) => {
  const bookId = req.params.id;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  const index = books.findIndex((item) => item.id === bookId);

  if (!name) {
    response(400, 'fail', { message: 'Gagal memperbarui buku. Mohon isi nama buku' }, res);
  } else if (readPage > pageCount) {
    response(400, 'fail', { message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' }, res);
  } else if (index === -1) {
    response(404, 'fail', { message: 'Gagal memperbarui buku. Id tidak ditemukan' }, res);
  } else {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    };

    response(200, 'success', { message: 'Buku berhasil diperbarui' }, res);
  }
};

const deleteBookByIdHandler = (req, res) => {
  const bookId = req.params.id;
  const index = books.findIndex((item) => item.id === bookId);

  if (index === -1) {
    response(404, 'fail', { message: 'Buku gagal dihapus. Id tidak ditemukan' }, res);
  } else {
    books.splice(index, 1);
    response(200, 'success', { message: 'Buku berhasil dihapus' }, res);
  }
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};