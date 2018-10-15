const listId = {};

exports.insertTable = (data, keyid, clear) => {
  Object.keys(data).forEach((row, id) => {
    if (row) {
      clear.writeToBase({
        table: 'athletes',
        data: {
          id: id + 1,
          full_name: data[row].Name,
          sex: data[row].Sex,
          age: data[row].Age,
          params: data[row].Param,
          team_id: keyid[data[row].NOC],
        },
      });
      listId[row] = id + 1;
    }
  });
  return listId;
};
