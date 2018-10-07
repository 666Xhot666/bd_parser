const fs = require('fs');
const path = require('path');

const rep = /("\s*)|(\s\([-A-z,]*\))/g;
const spl = /,(?!0|\s|\s-|[0-9]{3}\s)/g;

const mainData = {};
const data = {
  gameData: {},
  teamData: {},
  sportData: {},
  eventData: {},
  athletesData: {},
  resultData: {},
};

const file = fs.readFileSync(
  path.join(__dirname, '../Data/athlete_events.csv'), {
    encoding: 'utf-8',
  },
  err => console.log(err),
).split('\r\n');

const headers = file.shift().replace(/["\r]/g, '').split(',');
exports.createData = () => {
  file.forEach((Row) => {
    headers.forEach((value, index) => {
      mainData[value] = Row.replace(rep, '').split(spl)[index];
    });

    if (mainData.Sex === 'NA') mainData.Sex = null;
    if (mainData.Age === 'NA') mainData.Age = null;
    if (mainData.Weight === 'NA') mainData.Weight = '';
    if (mainData.Height === 'NA') mainData.Height = '';

    if (mainData.Season === 'Summer') {
      mainData.Season = '0';
    } else {
      mainData.Season = '1';
    }

    if (mainData.Medal !== 'NA') {
      if (mainData.Medal === 'Gold') { mainData.Medal = 1; }
      if (mainData.Medal === 'Silver') { mainData.Medal = 2; }
      if (mainData.Medal === 'Bronze') { mainData.Medal = 3; }
    } else {
      mainData.Medal = 0;
    }

    if (mainData.NOC) data.teamData[mainData.NOC] = [mainData.NOC, mainData.Team];

    if (mainData.Sport) data.sportData[mainData.Sport] = mainData.Sport;

    if (mainData.Event) { data.eventData[mainData.Event] = mainData.Event; }

    data.athletesData[mainData.Name] = [
      mainData.Name,
      mainData.Sex,
      mainData.Age,
      [mainData.Weight, mainData.Height],
      mainData.NOC,
    ];

    if (mainData.Year !== '1906') {
      data.resultData[mainData.Name] = [
        mainData.Name,
        mainData.Year,
        mainData.Season,
        mainData.Sport,
        mainData.Event,
        mainData.Medal,
      ];

      if (!data.gameData[mainData.Year]) {
        data.gameData[mainData.Year] = {
          0: [],
          1: [],
        };
      } else if (data.gameData[mainData.Year][mainData.Season].indexOf(mainData.City) === -1) {
        data.gameData[mainData.Year][mainData.Season].push(mainData.City);
      }
    }
  });
  return data;
};
