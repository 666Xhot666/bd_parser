// game-table-insert
const listId = {};

exports.insertTable = (data, clear) => {
  Object.keys(data).forEach((row, id) => {
    clear.writeToBase({
      table: 'games',
      data: {
        id: id + 1,
        year: data[row].Year,
        season: data[row].Season,
        city: data[row].City,
      },
    });
    listId[row] = id + 1;
  });
  return listId;
};
