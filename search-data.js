module.exports = (option) => {

  let key = (option.noc) ? 'teams.noc_name = "' + option.noc :
    (option.year) ? ' games.year = "' + option.year : '';

  let query = `SELECT ` + option.tableselect + `, results.medal
            FROM athletes, teams, results, games
            WHERE ` + key + `"
            AND games.season = " ` + option.season + ` "
            AND athletes.team_id=teams.id
            AND results.game_id=games.id
            AND results.athlete_id=athletes.id
            AND medal ` + option.medal + '  '

  return query;
}
