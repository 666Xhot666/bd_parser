"use strict";

const param = {
  summer: '0',
  winter: '1',
  gold: "= '1'",
  silver: "= '2'",
  bronze: "= '3'",
};

const typeParam = {
  summer: 'season',
  winter: 'season',
  gold: 'medal',
  silver: 'medal',
  bronze: 'medal',
};

const paramParse = (option) => {
  const data = {};

  option.forEach((value) => {
    if (+value) {
      typeParam[value] = 'year';
      param[value] = `= ${value}`;
    }
    if (value.length === 3) {
      typeParam[value] = 'noc';
      param[value] = value.toUpperCase();
    }
    data[typeParam[value]] = param[value];
  });
  return data;
};

module.exports.paramParse = paramParse;
