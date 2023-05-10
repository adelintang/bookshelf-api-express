const filteredBooks = (books) => {
  return books.reduce((acc, curr) => {
    acc.push({ id: curr.id, name: curr.name, publisher: curr.publisher });
    return acc;
  }, []);
};

module.exports = filteredBooks;