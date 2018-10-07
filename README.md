# BD_parser
![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

BD_Parser is a script for:

  - Transfering data from files .csv in SQLite base 
  - Showed line diagram about data in base
  
You can now:
  - Import and save data from file .csv
  - Viev diagram about olimpic games

> In future this project was update for another type of data;
### Using
##### Create database:
- Create a folder 'Data' into folder 'bd_parser' 
- Insert into Data two files:
    - .csv 
    - .bd(sqlite)
- Start parser 
```sh
$ node parser
```
- After finish you are have file (.bd) with data from (.csv) 

##### Viev diagram:
- Start app with parametres
```sh
$ node app [/medals[season,noc[medal]] | /topteams[season[year,medal]]]
```

