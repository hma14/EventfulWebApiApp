'use strict'

var apiServices = angular.module('apiServices', ['ngResource'])

apiServices.factory('Services', ['$resource',
    function ($resource) {
        //return $resource(serviceBase + 'api/Images/:id', {}, {
        //    query: { method: "GET", cache:true, isArray: true },
        //    create: { method: "POST" },
        //    get: { method: "GET", cache:true, url: serviceBase + "api/Images?id=:id" },
        //    remove: { method: "DELETE", url: serviceBase + "api/Images?id=:id" },
        //    update: { method: "PUT", url: serviceBase + "api/Images?id=:id" }
        //})
        return $resource(serviceBase + 'events/get');
}])