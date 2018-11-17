'use strict';

const Diagram = require('./build-diagram');
const query = require('./query');

module.exports = class {
  constructor(param,db) {
    this.param = param;
    this.db = db;
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
        query.medals(this.db,this.season, this.medal, this.noc_name).then((result)=>{
          this.diagram = new Diagram(result);
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
      query.topteams(this.db,this.season, this.medal, this.year).then((result) => {
        this.diagram = new Diagram(result);
        this.diagram.topteams();
      });
    } else console.log('Please enter a season (summer or winter)');
  };
};
