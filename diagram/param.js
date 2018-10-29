module.exports = class Build {
  constructor(params) {
    this.param = params;
  }

  getSeason() {

    this.defaultvalues = {
      'summer': '0',
      'winter': '1',
    };

    function season(element) {
      return element === 'summer' || element === 'winter';
    };

    this.season = this.defaultvalues[this.param.find(season)];

    return this.season;
  };

  getMedal() {

    this.defaultvalues = {
      'gold': '1',
      'silver': '2',
      'bronze': '3',
    };

    function medal(element) {
      return element === 'gold' || element === 'silver' || element === 'bronze';
    };

    this.medal = this.defaultvalues[this.param.find(medal)];

    return this.medal;
  };

  getYear() {

    function year(element) {
      return element.match(/[0-9]{4}/g)
    };

    this.year = this.param.find(year);

    return this.year;
  };

  getNoc() {

    function noc_name(element) {
      return element.match(/[A-Z]{3}/g)
    };

    this.noc_name = this.param.find(noc_name);

    return this.noc_name;
  };
};
