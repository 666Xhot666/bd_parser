// team-table-insert
const listId = {};

exports.insertTable = (data, clear) => {
  Object.keys(data).forEach((row, id) => {
    clear.writeToBase({
      table: 'teams',
      data: {
        id: id + 1,
        noc_name: row,
        name: data[row],
      },
    });
    listId[row] = id + 1;
  });
  return listId;
};
