/// <reference path="F:\Visual_Studio_2015_Apps\InvestXCodeChallenge\InvestXCodeChallenge\Scripts/angular-route.min.js" />
/// <reference path="F:\Visual_Studio_2015_Apps\InvestXCodeChallenge\InvestXCodeChallenge\Scripts/angular.min.js" />

'use strict'

var app = angular.module('app', ['ngRoute', 'dirPagination', 'ngStorage']).
    config(function ($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '/Html/SearchEvents.html',
            controller: 'appController'
        }).
        otherwise({
            redirectTo: '/'
        })
        $locationProvider.html5Mode(true);
    })



app.controller('appController', ['$scope', '$rootScope', '$localStorage', '$filter',
    function ($scope, $rootScope, $localStorage, $filter) {
    
    var app_key = 'vxnRCQBVMBcH9xmF'

    $scope.startDate = $filter('date')(new Date('01/01/2016'), 'yyyy-MM-dd')
    $scope.endDate = $filter('date')(new Date(), 'yyyy-MM-dd')
    $scope.query = 'music'
    $scope.sortField = 'start_time'
    $scope.reverse = true


    $scope.getEvents = function () {
        if ($scope.loc === undefined)
            $scope.loc = $localStorage.location
        else
            $localStorage.location = $scope.loc

        var startDate = $filter('date')(new Date($scope.startDate), 'yyyyMMdd00')
        var endDate = $filter('date')(new Date($scope.endDate), 'yyyyMMdd00')

        var oArgs = {
            app_key: app_key,
            q: $scope.query,
            where: $scope.loc,
            //"date": "2015010100-2020062000",
            "date": startDate + "-" + endDate,
            "include": "tags,categories",
            page_size: 1000,
            sort_order: "Date",
            sort_direction: "descending",
        }

        // Eventful.com javascript api call
        EVDB.API.call("/events/search", oArgs, function (oData) {
            $rootScope.events = []
            angular.forEach(oData.events, function (events, key) {
                angular.forEach(events, function(event, key) {
                    $rootScope.events.push(
                            {
                                title: event.title,
                                location: event.venue_address + ', ' + event.city_name + ', ' +
                                    event.region_name + ', ' + event.country_name,
                                start_time: event.start_time,
                                performers: event.performers,
                                image: event.image,
                            }
                   )
                }
               )
            })
        });

    }
}])