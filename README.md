# Faces of Death Row

[Faces of Death Row](http://apps.texastribune.org/death-row) was produced by Jolie McCullough for The Texas Tribune. It is a visualization of all inmates currently on death row in Texas filterable by length of stay, race, age, sex, county and execution date. It could easily be modified to show other filterable data.

This app was built on the Texas Tribune's Data Visuals kit. It is assisted by the libraries [filter.js](https://github.com/jiren/filter.js/tree/master) and [chosen.js](https://github.com/harvesthq/chosen).

## Data
The data in this app was originally collected from the [Texas Department of Criminal Justice](http://www.tdcj.state.tx.us/) (TDCJ) in April 2015 via an open records request. The conviction summaries are gathered from TDCJ records, court documents and news articles and summarized by the Texas Tribune. As of August 2023, this project is no longer updated by the Tribune.


## Update Process

_Please note - some static assets required to make this project work are only accessible to Texas Tribune developers._

**Note:** The project also uses an old version of node. I was able to update and deploy using node version `v8.16.0`.

Clone the project, then run `npm install`. Then pull down the assets with `npm run assets:pull`, and the data with `npm run data:fetch`. Use `npm run serve` to run the local development server.

The data is stored in a [Google spreadsheet](https://docs.google.com/spreadsheets/d/1pBt4RC1143DRGwZBiuS9FNNsX4GKW6pAMA-mFzHQig4/) which can be edited with anyone who has a Tribune email address. Here is a [public version](https://docs.google.com/spreadsheets/d/1pBt4RC1143DRGwZBiuS9FNNsX4GKW6pAMA-mFzHQig4/pubhtml#). To remove or add an inmate, simply edit the spreadsheet.
