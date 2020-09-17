const axios = require('axios');

exports.handler = function(context, event, callback) {
    const zipcode = event.zipcode;
    let data = {newDeaths: 0, newPositives: 0}

    axios
      .get(`https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipcode}&daysInPast=7`)
      .then((res) => {
        let recentDeathCount = 0;
        let recentPosCount = 0;
        let oldestDeathCount = 0;
        let oldestPosCount = 0;
        res.data.counties.forEach((county) => {
          let oldestIndex = county.historicData.length - 1;
          recentDeathCount += county.historicData[0].deathCt;
          oldestDeathCount += county.historicData[oldestIndex].deathCt;
          recentPosCount += county.historicData[0].positiveCt;
          oldestPosCount += county.historicData[oldestIndex].positiveCt;
        });
        data.newDeaths = recentDeathCount - oldestDeathCount;
        data.newPositives = recentPosCount - oldestPosCount;
        return callback(null, data);
      })
      .catch(() => console.log("error"));
      
};
