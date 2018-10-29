'use strict';

const Diagram = require('./build-diagram');
const query = require('./query');

module.exports = class {
  constructor(param) {
    this.param = param;
  };

  medals() {
    this.season = this.param.getSeason();
    this.noc_name = this.param.getNoc();
    this.medal = this.param.getMedal();

    console.log('Season :', this.season);
    console.log('Medal :', this.medal);
    console.log('NOC :', this.noc_name);
    console.log('');

    if (this.season) {
      if (this.noc_name) {
        query.queryMedals(this.season, this.medal, this.noc_name, (data) => {
          this.diagram = new Diagram(data);
          this.diagram.medals();
        });
      } else console.log('Please enter a right noc_name(in Upper Case example GRE)');
    } else console.log('Please enter a season (summer or winter)');
  };

  topteams() {
    this.season = this.param.getSeason();
    this.year = this.param.getYear();
    this.medal = this.param.getMedal();

    console.log('Season :', this.season);
    console.log('Medal :', this.medal);
    console.log('Year :', this.year);
    console.log('');

    if (this.season) {
      query.queryTopteams(this.season, this.medal, this.year, (data) => {
        this.diagram = new Diagram(data);
        this.diagram.topteams();
      });
    } else console.log('Please enter a season (summer or winter)');
  };
};
