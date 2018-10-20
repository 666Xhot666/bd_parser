# BD_parser
![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

BD_Parser is a script for:

  - Transferring data from files .csv in SQLite base
  - Showed line diagram about data in base

You can now:
  - Import and save data from file .csv
  - View diagram about Olympic games

> In future this project was update for another type of data;
### Using
##### Create database:
- Create a folder 'Data' into folder 'bd_parser'
- Insert into Data two files:
    - .csv
    - .bd(sqlite)
- Start parser
```sh
$ npm start
```
- After finish you are have file (.bd) with data from (.csv)

##### View diagram:
- Start npm with parameters
```sh
$ npm start [/medals[season,noc[medal]] | /topteams[season[year,medal]]]
```

##### Test script with ESlint:
```sh
$ npm test
```
