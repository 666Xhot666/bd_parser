exports.insertTable = (data,clear) => {
  Object.keys(data).forEach((row, id) => {
    if (row) {
      clear.writeToBase({
        table: 'athletes',
        data: {
          id: row,
          full_name: data[row].Name,
          sex: data[row].Sex,
          age: data[row].Age,
          params: data[row].Param,
          team_id: data[row].NOC,
        },
      });
    }
  });
};
