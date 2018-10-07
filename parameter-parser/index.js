module.exports = (option) => {
  const data = {
    medal: '> \'0\'',
  };

  option.forEach((value) => {
    value = value.toLowerCase();

    if (value === 'gold' || value === 'silver' || value === 'bronze') {
      if (value === 'gold') { data.medal = '= \'1\''; }
      if (value === 'silver') { data.medal = '= \'2\''; }
      if (value === 'bronze') { data.medal = '= \'3\''; }
    }

    if (value === 'summer' || value === 'winter') {
      data.season = (value === 'summer') ? '0' : '1';
    }

    if (value === 'medals' || value === 'topteams') {
      data.chart_name = value;
    }

    if (value.length === 3) {
      data.noc = value.toUpperCase();
    }

    if (+value) {
      data.year = value;
    }
  });
  return data;
};
