module.exports = (option) => {
  const key = () => {
    if (option.noc) return `AND teams.noc_name = '${option.noc}'`;
    if (option.year) {
      return `AND games.year = '${option.year}'`
    } else {
      return ''
    };
  }
  return `SELECT ${option.tableselect}, results.medal
            FROM athletes, teams, results, games
            WHERE medal ${option.medal}
            AND games.season =  '${option.season}'
            AND athletes.team_id = teams.id
            AND results.game_id = games.id
            AND results.athlete_id = athletes.id
            ${key()}`
}
