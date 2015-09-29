var Promise = require('bluebird');
var rp = require('request-promise');

function Pinterest(apiToken) {
	this.apiToken = apiToken;
}

Pinterest.prototype.__route = function(path) {
	var routes = {
		'me': Pinterest.prototype.__generic,
		'me/pins': Pinterest.prototype.__generic,
		'me/boards': Pinterest.prototype.__generic,
		'me/likes': Pinterest.prototype.__generic,
		'me/followers': Pinterest.prototype.__generic,
		'me/following/boards': Pinterest.prototype.__generic,
		'me/following/users': Pinterest.prototype.__generic,
		'me/following/interests': Pinterest.prototype.__generic,
	};
	return routes[path].bind(this)(path);
};

Pinterest.prototype.__buildInfo = function(path) {
	return {
		url: 'https://api.pinterest.com/v1/' + path,
		headers: {
			'Authorization': 'Bearer ' + this.apiToken
		}
	};
};

Pinterest.prototype.__generic = function(path) {
	return rp(this.__buildInfo(path));
};

Pinterest.prototype.api = function(path) {
	return this.__route(path).then(function(body) {
		try {
			return Promise.resolve(JSON.parse(body));
		}
		catch (e) {
			return Promise.reject(e);
		}
	});
};

exports.init = function(apiToken) {
	return new Pinterest(apiToken);
};
