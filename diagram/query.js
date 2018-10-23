'use strict'
const bd = require('../bd');
exports.queryMedals = (season,medal='> 0',noc,callback) =>{
  bd.searchData(`SELECT games.year, COUNT(results.medal)
            FROM athletes, teams, results, games
            WHERE medal ${medal}
            AND games.season =  ${season}
            AND athletes.team_id = teams.id
            AND results.game_id = games.id
            AND results.athlete_id = athletes.id
            AND teams.noc_name = '${noc}'
            GROUP BY games.year
            ORDER BY games.year`,(row) => callback(row));
};

exports.queryTopteams = (season,medal=`> '0'`,year=`> '0'`,callback) =>{
  bd.searchData(`SELECT teams.noc_name, COUNT(results.medal)
            FROM athletes, teams, results, games
            WHERE medal ${medal}
            AND games.season =  ${season}
            AND athletes.team_id = teams.id
            AND results.game_id = games.id
            AND results.athlete_id = athletes.id
            AND games.year ${year}
            GROUP BY teams.noc_name
            ORDER BY COUNT(results.medal) DESC `,(row) => callback(row));
  };
