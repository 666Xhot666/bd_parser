// spots-table-insert
exports.insertTable = (data, clear) => {
  Object.keys(data).forEach((row, id) => {
    clear.writeToBase({
      table: 'sports',
      data: {
        id: data[row].id,
        name:row,
      },
    });
  });
};
