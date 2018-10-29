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

class Id {
  getId(obj) {
    this.leng = Object.keys(obj).length + 1;
    return this.leng
  };
}

const formatter = function(data, callback) {
  this.data = data.data;
  this.id = new Id();
  data.file.forEach((Row, key) => {

    data.headers.forEach((value, index) => {
      mainData[value] = Row.replace(data.rep, '').split(data.spl)[index];
    });

    analize(data.basic, mainData, (values) => {

      if (!this.data.teamData[values.NOC]) this.data.teamData[values.NOC] = {

        id: Object.keys(this.data.teamData).length + 1,
        team: values.Team,

      };

      if (!this.data.sportData[values.Sport])

        this.data.sportData[values.Sport] = {
          id: this.id.getId(this.data.sportData),

        };

      if (!this.data.eventData[values.Event])
        this.data.eventData[values.Event] = {
          id: this.id.getId(this.data.eventData),
        };

      this.data.athletesData[values.ID] = {
        Name: values.Name,
        Sex: values.Sex,
        Age: values.Age,
        Param: values.Param,
        NOC: this.data.teamData[values.NOC].id,
      };

      if (values.Year !== '1906' && values.Games) {

        if (!this.data.gameData[values.Games]) {
          this.data.gameData[values.Games] = {
            id: Object.keys(this.data.gameData).length + 1,
            Year: values.Year,
            Season: values.Season,
            City: [values.City],
          };
        } else if (this.data.gameData[values.Games].City.indexOf(values.City) === -1) {
          this.data.gameData[values.Games].City.push(values.City);
        }

        if (!this.data.athlete[values.ID]) {
          this.data.athlete[values.ID] = {
            Name: values.ID,
            Games: {
              [this.data.gameData[values.Games].id]: {
                Sport: this.data.sportData[values.Sport].id,
                Event: {
                  [this.data.eventData[values.Event].id]: values.Medal,
                },
              },
            },
          };
        } else {
          if (!this.data.athlete[values.ID].Games[this.data.gameData[values.Games].id]) {
            this.data.athlete[values.ID].Games[this.data.gameData[values.Games].id] = {
              Sport: this.data.sportData[values.Sport].id,
              Event: {
                [this.data.eventData[values.Event].id]: values.Medal,
              },
            };
          }
          if (!this.data.athlete[values.ID].Games[this.data.gameData[values.Games].id].Event[this.data.eventData[values.Event].id]) {
            this.data.athlete[values.ID].Games[this.data.gameData[values.Games].id].Event[this.data.eventData[values.Event].id] = values.Medal;
          }
        }
      }
    });
    if (key + 1 === data.file.length) {
      console.log('Athletes', Object.keys(this.data.athletesData).length);
      console.log('Games', Object.keys(this.data.gameData).length);
      console.log('Events', Object.keys(this.data.eventData).length);
      console.log('Sports', Object.keys(this.data.sportData).length);
      console.log('Teams', Object.keys(this.data.teamData).length);

      callback(this.data);
    }
  });
};

module.exports.formatter = formatter;
