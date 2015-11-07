const HapiMongoModels = require('hapi-mongo-models');
const Path = require('path');

const Config = require('../../config');

var modelBasePath = './server/models/';

module.exports = {
  register: HapiMongoModels,
  options: {
    mongodb: {
      url: Config.mongo.uri,
      options: {}
    },
    autoIndex: false,
    models: {
      List: Path.join(modelBasePath, 'list'),
      User: Path.join(modelBasePath, 'user')
    }
  }
};
