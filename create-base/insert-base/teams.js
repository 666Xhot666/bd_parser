// team-table-insert
exports.insertTable = (data, clear) => {
  Object.keys(data).forEach((row, id) => {
    clear.writeToBase({
      table: 'teams',
      data: {
        id: data[row].id,
        noc_name: row,
        name: data[row].team,
      },
    });
  });
};
