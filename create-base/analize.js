"use strict";

class Normalize {
  constructor(row, basic, rep, spl) {
    this.fetch = row.replace(rep, '').split(spl);
    this.values = {
      ID: this.fetch[0],
      Name: this.fetch[1],
      Sex: (this.fetch[2] !== 'NA') ? this.fetch[2] : null,
      Age: (this.fetch[3] !== 'NA') ? this.fetch[3] : null,
      Height: (this.fetch[4] !== 'NA') ? this.fetch[4] : '',
      Weight: (this.fetch[5] !== 'NA') ? this.fetch[5] : '',
      Team: this.fetch[6],
      NOC: this.fetch[7],
      Games: this.fetch[8],
      Year: this.fetch[9],
      Season: basic.season[this.fetch[10]],
      City: this.fetch[11],
      Sport: this.fetch[12],
      Event: this.fetch[13],
      Medal: basic.medal[this.fetch[14]],
    };
  };
  getValues() {
    return this.values;
  }
};

class Teams {
  constructor() {
    this.data = {};
  };
  setData(noc, team) {
    if (!this.data[noc])
      this.data[noc] = {
        id: Object.keys(this.data).length + 1,
        team: team,
      };
  };
  getData() {
    return this.data;
  };
  getId(variable) {
    return this.data[variable].id;
  }
}

class Sports {
  constructor() {
    this.data = {};
  };
  setData(sport) {
    if (!this.data[sport])
      this.data[sport] = {
        id: Object.keys(this.data).length + 1,
      };
  };
  getData() {
    return this.data;
  };
  getId(variable) {
    return this.data[variable].id;
  }
}

class Events {
  constructor() {
    this.data = {};
  };
  setData(event) {
    if (!this.data[event])
      this.data[event] = {
        id: Object.keys(this.data).length + 1,
      };
  };
  getData() {
    return this.data;
  };
  getId(variable) {
    return this.data[variable].id;
  }
}

class Games {
  constructor() {
    this.data = {};
  };
  setData(games, year, season, city) {
    if (year !== '1906') {
      if (!this.data[games]) {
        this.data[games] = {
          id: Object.keys(this.data).length + 1,
          Year: year,
          Season: season,
          City: [city]
        };
      } else if (this.data[games].City.indexOf(city) === -1) {
        this.data[games].City.push(city);
      }
    }
  };
  getData() {
    return this.data;
  };
  getId(variable) {
    return this.data[variable].id;
  }
}

class Athletes {
  constructor() {
    this.data = {};
  };
  setData(id, name, sex, age, param, noc) {
    this.data[id] = {
      Name: name,
      Sex: sex,
      Age: age,
      Param: param,
      NOC: noc
    }
  };
  getData() {
    return this.data;
  };
}

class Results {
  constructor() {
    this.data = {};
    this.index = 0;
  };
  setData(id, gameId, sportId, eventId, medal) {
    this.data[this.index] = {
      id:id,
      game:gameId,
      sport:sportId,
      event:eventId,
      medal: medal,
    }
    this.index+=1;
  };
  getData() {
    return this.data;
  }
}

const formatter = (data) => new Promise(((resolve) => {
  this.team = new Teams();
  this.sport = new Sports();
  this.event = new Events();
  this.athletes = new Athletes();
  this.game = new Games();
  this.result = new Results();
  data.lineReader.on('line', (line) => {
      this.normalize = new Normalize(line, data.basic, data.rep, data.spl);
      this.values = this.normalize.getValues();
      if (this.values.ID !== 'ID') {
        this.team.setData(this.values.NOC, this.values.Team);
        this.sport.setData(this.values.Sport);
        this.event.setData(this.values.Event);
        if (this.values.Year !== '1906') {
          this.game.setData(this.values.Games, this.values.Year, this.values.Season, this.values.City);
          this.result.setData(
            this.values.ID,
            this.game.getId(this.values.Games),
            this.sport.getId(this.values.Sport),
            this.event.getId(this.values.Event),
            this.values.Medal
          )
        }
        this.athletes.setData(
          this.values.ID,
          this.values.Name,
          this.values.Sex,
          this.values.Age,
          [this.values.Height, this.values.Weight],
          this.team.getId(this.values.NOC)
        );
      }
    })
    .on('close', () => {
      console.log('File Parsing sacessfull');
      resolve({
        Teams: this.team.getData(),
        Sports: this.sport.getData(),
        Events: this.event.getData(),
        Athletes: this.athletes.getData(),
        Games: this.game.getData(),
        Results: this.result.getData(),
      });
    })

}));

module.exports = formatter;
