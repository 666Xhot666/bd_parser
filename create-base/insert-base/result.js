// result-table-insert
exports.insertTable = (data,clear) => {
  Object.keys(data).forEach((row) => {
    Object.keys(data[row].Games).forEach((values) => {
      Object.keys(data[row].Games[values].Event).forEach((value) => {
        clear.writeToBase({
          table: 'results',
          data: {
            athlete_id: row,
            game_id: values,
            sport_id:data[row].Games[values].Sport,
            event_id:value,
            medal: data[row].Games[values].Event[value],
          },
        });
      });
    });
  });
};
