module.exports = (option) => {
  const data = {}
  for (let key in option) {
    let param = option[key].toLowerCase()
    switch (param) {

      case 'summer':
        {
          data.season = 0;
        }
        break;
      case 'winter':
        {
          data.season = 1;
        }
        break;

      case 'gold':
        {
          data.medal = '=1';
        }
        break;
      case 'silver':
        {
          data.medal = '=2';
        }
        break;
      case 'bronze':
        {
          data.medal = '=3';
        }
        break;

      case 'topteams':
        {
          data.chart_name = param;
        }
        break;
      case 'medals':
        {
          data.chart_name = param;
        }
        break;
      case year = (+param) ? param:
        '' : {
          data.year = param;
        }
        break;
      case noc = (param.length === 3) ? param:
        '' : {
          data.noc = param.toUpperCase();
        }
        break;
      default:

    }
  }

  return data;
}
