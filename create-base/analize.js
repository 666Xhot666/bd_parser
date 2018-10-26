"use strict";

const mainData = {};

const analize = (example, data, callback) => {
  const season = example.season;
  const medal = example.medal;
  data.Season = season[data.Season];
  data.Medal = medal[data.Medal];
  if (mainData.Sex === 'NA') mainData.Sex = null;
  if (mainData.Age === 'NA') mainData.Age = null;
  data.Height = (data.Height !== 'NA') ? data.Height : '';
  data.Weight = (data.Weight !== 'NA') ? data.Weight : '';
  data.Param = [data.Height, data.Weight];
  callback(data);
};

const formatter = function (data, callback) {
  this.data = data.data;
  data.file.forEach((Row, key) => {
    data.headers.forEach((value, index) => {
      mainData[value] = Row.replace(data.rep, '').split(data.spl)[index + 1];
    });
    analize(data.basic, mainData, (values) => {
      if (values.NOC) this.data.teamData[values.NOC] = values.Team;
      if (values.Sport) this.data.sportData[values.Sport] = values.Sport;
      if (values.Event) this.data.eventData[values.Event] = values.Event;
      if (values.Name) {
        this.data.athletesData[values.Name] = {
          Name: values.Name,
          Sex: values.Sex,
          Age: values.Age,
          Param: values.Param,
          NOC: values.NOC,
        };
      }

      if (values.Year !== '1906' && values.Games && values.Name) {
        if (!this.data.athlete[values.Name]) {
          this.data.athlete[values.Name] = {
            Name: values.Name,
            Games: {
              [values.Games]: {
                Year: values.Year,
                Season: values.Season,
                City: values.City,
                Sport: values.Sport,
                Event: {
                  [values.Event]: values.Medal,
                },
              },
            },
          };
        } else {
          if (!this.data.athlete[values.Name].Games[values.Games]) {
            this.data.athlete[values.Name].Games[values.Games] = {
              Year: values.Year,
              Season: values.Season,
              City: values.City,
              Sport: values.Sport,
              Event: {
                [values.Event]: values.Medal,
              },
            };
          }
          if (!this.data.athlete[values.Name].Games[values.Games].Event[values.Event]) {
            this.data.athlete[values.Name].Games[values.Games].Event[values.Event] = values.Medal;
          }
        }
        if (!this.data.gameData[values.Games]) {
          this.data.gameData[values.Games] = {
            Year: values.Year,
            Season: values.Season,
            City: [values.City],
          };
        } else if (this.data.gameData[values.Games].City.indexOf(values.City) === -1) {
          this.data.gameData[values.Games].City.push(values.City);
        }
      }
    });
    if (key + 1 === data.file.length) { callback(this.data); }
  });
};

module.exports.formatter = formatter;
