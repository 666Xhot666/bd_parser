exports.insertTable = (data, clear) => {
  Object.keys(data).forEach((row, id) => {
    clear.writeToBase({
      table: 'events',
      data: {
        id: data[row].id,
        name: row,
      },
    });
  });
};
