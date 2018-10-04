module.exports = (option) => {
  const data = {
    medal: `> '0'`
  }

  option.forEach(value => {
    value = value.toLowerCase()

    if (value === 'gold' || value === 'silver' || value === 'bronze') {
      data.medal = (value === 'gold') ? `= '1'` :
        (value === 'silver') ? `= '2'` : `= '3'`
    }

    if (value === 'summer' || value === 'winter') {
      data.season = (value === 'summer') ? '0' : '1';
    }

    if (value === 'medals' || value === 'topteams') {
      data.chart_name = value
    }

    if (value.length === 3) {
      data.noc = value.toUpperCase()
    }

    if (+value) {
      data.year = value;
    }

  })
  return data;
}
