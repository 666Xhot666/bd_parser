const fs = require('fs');
const path = require('path');

const file = fs.readFileSync(
  path.join(__dirname, '../../Data/athlete_events.csv'), {
    encoding: 'utf-8',
  },
  err => console.log(err),
).split('\r\n');

const headers = file.shift().replace(/["\r]/g, '').split(',');

const rep = /("\s*)|(\s\([-A-z,]*\))|(\s\([-A-z, ]*\))/g;
const spl = /,(?!0|\s|\s-|[0-9]{3}\s)/g;

const mainData = {};
const data = {
  athlete: {},
  gameData: {},
  teamData: {},
  sportData: {},
  eventData: {},
  athletesData: {},
};

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

    if (mainData.Medal === 'Gold') {
      mainData.Medal = 1;
    } else if (mainData.Medal === 'Silver') {
      mainData.Medal = 2;
    } else if (mainData.Medal === 'Bronze') {
      mainData.Medal = 3;
    } else {
      mainData.Medal = 0;
    }

    if (mainData.NOC) data.teamData[mainData.NOC] = mainData.Team;
    if (mainData.Sport) data.sportData[mainData.Sport] = mainData.Sport;
    if (mainData.Event) data.eventData[mainData.Event] = mainData.Event;
    if (mainData.Name) {
      data.athletesData[mainData.Name] = {
        Name: mainData.Name,
        Sex: mainData.Sex,
        Age: mainData.Age,
        Param: [mainData.Weight, mainData.Height],
        NOC: mainData.NOC,
      };
    }

    if (mainData.Year !== '1906' && mainData.Games && mainData.Name) {
      if (!data.athlete[mainData.Name]) {
        data.athlete[mainData.Name] = {
          Name: mainData.Name,
          Games: {
            [mainData.Games]: {
              Year: mainData.Year,
              Season: mainData.Season,
              City: mainData.City,
              Sport: mainData.Sport,
              Event: {
                [mainData.Event]: mainData.Medal,
              },
            },
          },
        };
      } else {
        if (!data.athlete[mainData.Name].Games[mainData.Games]) {
          data.athlete[mainData.Name].Games[mainData.Games] = {
            Year: mainData.Year,
            Season: mainData.Season,
            City: mainData.City,
            Sport: mainData.Sport,
            Event: {
              [mainData.Event]: mainData.Medal,
            },
          };
        }
        if (!data.athlete[mainData.Name].Games[mainData.Games].Event[mainData.Event]) {
          data.athlete[mainData.Name].Games[mainData.Games].Event[mainData.Event] = mainData.Medal;
        }
      }
      if (!data.gameData[mainData.Games]) {
        data.gameData[mainData.Games] = {
          Year: mainData.Year,
          Season: mainData.Season,
          City: [mainData.City],
        };
      } else if (data.gameData[mainData.Games].City.indexOf(mainData.City) === -1) {
        data.gameData[mainData.Games].City.push(mainData.City);
      }
    }
  });
  return data;
};
