const {HandicapConfig} = require("../../../../models");


const filterHandicapsFromSeniors = (seniorId) => HandicapConfig.get().filter((handicap) => (handicap.seniorId === seniorId))

module.exports = {
  filterHandicapsFromSeniors
}
