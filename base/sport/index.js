// spots-table-insert
const listId = {};

exports.insertTable = (data, clear) => {
  Object.keys(data).forEach((row, id) => {
    clear.writeToBase({
      table: 'sports',
      data: {
        id: id + 1,
        name: data[row],
      },
    });
    listId[row] = id + 1;
  });
  return listId;
};
