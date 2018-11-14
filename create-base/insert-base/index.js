"use strict";

const athlete = require('./athlete');
const team = require('./teams');
const game = require('./game');
const event = require('./event');
const result = require('./result');
const sport = require('./sport');

const insert = (data, db, startTime) => {
  startTime = Date.now();
  team(data.Teams, db).then((team_result) => {
    console.log(team_result,(Date.now() - startTime)/1000);
    startTime = Date.now();
    sport(data.Sports, db).then((sport_result) => {
      console.log(sport_result,(Date.now() - startTime)/1000);
      startTime = Date.now();
      event(data.Events, db).then((event_result) => {
        console.log(event_result,(Date.now() - startTime)/1000);
        startTime = Date.now();
        game(data.Games, db).then((game_result) => {
          console.log(game_result,(Date.now() - startTime)/1000);
          startTime = Date.now();
          athlete(data.Athletes, db).then((athlete_result) => {
            console.log(athlete_result,(Date.now() - startTime)/1000);
            startTime = Date.now();
            result(data.Results, db).then((result) => {
              console.log(result,(Date.now() - startTime)/1000);
            });
          });
        });
      });
    });
  });
};

module.exports = insert;
