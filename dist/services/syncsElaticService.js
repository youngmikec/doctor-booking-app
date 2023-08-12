//"use strict";

var _request = _interopRequireDefault(require("request"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const request = require("request");

// require('dotenv').config();
require('dotenv').config();
var createPost = function createPost(data) {
  _request["default"].post({
    url: "".concat(process.env.ELASTIC_HOST, "/doctorcare_haryphamdev/posts/").concat(data.postId),
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  }, function (error, response, body) {
    if (error) {
      console.log('error sync create elastic posts');
      console.log(error);
    }
  });
};
var updatePost = function updatePost(data) {
  _request["default"].put({
    url: "".concat(process.env.ELASTIC_HOST, "/doctorcare_haryphamdev/posts/").concat(data.postId),
    headers: {
      'Content-Type': 'application/json'
    },
    json: data
  }, function (error, response, body) {
    if (error) {
      console.log('error sync update elastic posts');
      console.log(error);
    }
  });
};
var deletePost = function deletePost(id) {
  _request["default"]["delete"]({
    url: "".concat(process.env.ELASTIC_HOST, "/doctorcare_haryphamdev/posts/").concat(id),
    headers: {
      'Content-Type': 'application/json'
    }
  }, function (error, response, body) {
    if (error) {
      console.log('error sync delete elastic posts');
      console.log(error);
    }
  });
};
var findPostsByTerm = function findPostsByTerm(keyword) {
  return new Promise(function (resolve, reject) {
    var query = {
      "query": {
        "multi_match": {
          "query": "".concat(keyword),
          "type": "most_fields",
          "fields": ["title", "content"]
        }
      },
      "highlight": {
        "pre_tags": ["<strong>"],
        "post_tags": ["</strong>"],
        "fields": {
          "title": {
            "fragment_size": 200,
            "number_of_fragments": 1
          },
          "content": {
            "fragment_size": 200,
            "number_of_fragments": 1
          }
        }
      }
    };
    _request["default"].get({
      url: "".concat(process.env.ELASTIC_HOST, "/doctorcare_haryphamdev/posts/_search"),
      headers: {
        'Content-Type': 'application/json'
      },
      json: query
    }, function (error, response, body) {
      if (error) {
        console.log('error search elastic posts');
        console.log(error);
        reject(error);
      }
      resolve(body);
    });
  });
};
var syncElastic = {
  createPost: createPost,
  updatePost: updatePost,
  deletePost: deletePost,
  findPostsByTerm: findPostsByTerm
};
module.exports = syncElastic;