// game-table-insert
exports.insertTable = (data, clear) => {
  Object.keys(data).forEach((row, id) => {
    clear.writeToBase({
      table: 'games',
      data: {
        id: data[row].id,
        year: data[row].Year,
        season: data[row].Season,
        city: data[row].City,
      },
    });
  });
};
