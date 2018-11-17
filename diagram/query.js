"use strict";

  const queryMedals = (db,season, medal, noc, callback) => new Promise(((resolve) => {
  db.all(`SELECT DISTINCT year, COUNT(noc_name) medals from games
    LEFT JOIN (
      SELECT noc_name, y FROM teams
        LEFT JOIN athletes ON athletes.team_id = teams.id
        INNER JOIN (
          SELECT * from results WHERE results.medal ${medal ? '= $_medal' : 'IN (1,2,3)'}
        ) AS res ON res.athlete_id = athletes.id
        INNER JOIN (
          SELECT id, year y from games WHERE games.season = $_season
        ) AS game ON RES.game_id = game.id
      WHERE noc_name = $_noc_name
    ) AS MEDALS ON year = MEDALS.y
    GROUP BY year
    ORDER BY year ASC`,{
        $_medal:`${medal}`,
        $_noc_name: `${noc}`,
        $_season: `${season}`
    }, (err,result) => resolve(result))
  }))

 const queryTopteams = (db,season, medal, year, callback) => new Promise(((resolve) => {
    db.all(`SELECT noc_name noc, COUNT(medal) medals FROM results
    LEFT JOIN athletes ON results.athlete_id = athletes.id
    LEFT JOIN teams ON athletes.team_id = teams.id
    LEFT JOIN games ON results.game_id = games.id
  WHERE ${year ? `year = $_year AND` : ''} season = $_season AND medal ${medal ? '= $_medal' : 'IN (1, 2, 3)'}
  GROUP BY noc_name
  ORDER BY count(medal) DESC`,{
    $_medal:medal,
    $_year:year,
    $_season: season,
  },(err,result) => resolve(result))
  }))

module.exports.medals = queryMedals;
module.exports.topteams = queryTopteams;
