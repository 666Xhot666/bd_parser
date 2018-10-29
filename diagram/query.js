"use strict";

const bd = require('../database');

const buildQuery = {

  queryMedals(season, medal, noc, callback) {
    if(medal){
      this.key =`medal = ${medal} AND`
    }else{
      this.key = ``
    }
    bd.searchData(`SELECT games.year, results.medal
              FROM athletes, teams, results, games
              WHERE ${this.key} games.season =  ${season}
              AND results.athlete_id = athletes.id
              AND athletes.team_id = teams.id
              AND results.game_id = games.id
              AND teams.noc_name = '${noc}'`, row => callback(row));
  },
  
  queryTopteams(season, medal, year, callback) {
    if(medal) this.keyMedal =`medal = ${medal} AND`
    else this.keyMedal = `medal > 0 AND`;
    if(year) this.keyYear =`AND games.year = ${year}`
    else this.keyYear = ``;
    bd.searchData(`SELECT teams.noc_name, COUNT(results.medal) AS medal
              FROM athletes, teams, results, games
              WHERE ${this.keyMedal} games.season =  ${season}
              AND athletes.team_id = teams.id
              AND results.game_id = games.id
              AND results.athlete_id = athletes.id
              ${this.keyYear}
              GROUP BY teams.noc_name
              ORDER BY COUNT(results.medal) DESC `, row => callback(row));
  },
};

module.exports = buildQuery;
