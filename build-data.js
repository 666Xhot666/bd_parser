module.exports = function() {
  const fs = require('fs')
  const path = require('path')

  const rep = /("\s*)|(\s\([-A-z,]*\))/g
  const spl = /,(?!0|\s|\s-|500|980)/g

  const file = fs.readFileSync(
    path.join(__dirname, '/Data/athlete_events.csv'), {
      encoding: 'utf-8'
    },
    err => console.log(err)).split('\r\n')

  const headers = file.shift().replace(/["\r]/g, '').split(',')
  const mainData = {}
  const data = {}

  data.gameData = {},
    data.teamData = {},
    data.sportData = {},
    data.eventData = {},
    data.athletesData = {},
    data.resultData = {};

  file.forEach(Row => {

    for (let i in headers) {
      mainData[headers[i]] = Row.replace(rep, "").split(spl)[i]
    }

    if (mainData.Sex === 'NA') mainData.Sex = null;
    if (mainData.Age === 'NA') mainData.Age = null;
    if (mainData.Weight === 'NA') mainData.Weight = '';
    if (mainData.Height === 'NA') mainData.Height = '';

    if (mainData.Season === 'Summer') {
      mainData.Season = '0';
    } else {
      mainData.Season = '1';
    };

    if (mainData.Medal != 'NA') {
      mainData.Medal = (mainData.Medal === 'Gold') ? 1 :
        (mainData.Medal === 'Silver') ? 2 : 3;
    } else {
      mainData.Medal = 0;
    };

    if (mainData.NOC) data.teamData[mainData.NOC] = [mainData.NOC, mainData.Team];

    if (mainData.Sport) data.sportData[mainData.Sport] = mainData.Sport;

    if (mainData.Event)
      data.eventData[mainData.Event] = mainData.Event;

    data.athletesData[mainData.Name] = [
      mainData.Name,
      mainData.Sex,
      mainData.Age,
      [mainData.Weight, mainData.Height],
      mainData.NOC
    ]

    if (mainData.Year != 1906) {
      data.resultData[mainData.Name] = [
        mainData.Name,
        mainData.Year,
        mainData.Season,
        mainData.Sport,
        mainData.Event,
        mainData.Medal
      ]

      if (!data.gameData[mainData.Year]) data.gameData[mainData.Year] = {
        0: [],
        1: []
      }
      else if (data.gameData[mainData.Year][mainData.Season].indexOf(mainData.City) === -1) {
        data.gameData[mainData.Year][mainData.Season].push(mainData.City)
      }

    }

  })

  return data;

}
