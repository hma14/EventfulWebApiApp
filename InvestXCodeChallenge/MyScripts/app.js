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



app.controller('appController', ['$scope', '$rootScope', '$localStorage', '$filter', '$location',
    function ($scope, $rootScope, $localStorage, $filter, $location) {
    
    var app_key = 'vxnRCQBVMBcH9xmF'

    var today = new Date()
    var newDate = new Date()
    newDate.setDate(today.getDate() + 30)

    $scope.startDate = $filter('date')(today, 'yyyy-MM-dd')
    $scope.endDate = $filter('date')(newDate, 'yyyy-MM-dd')

    $scope.sortField = 'start_time'
    $scope.reverse = true
    $scope.showing = false

    $scope.loc = $localStorage.loc
    $scope.query = $localStorage.query
    $scope.pageNumber = $localStorage.pageNumber


    $scope.getEvents = function () {
        $rootScope.loading = true
        if ($scope.loc == null)
            $scope.loc = $localStorage.loc
        else
            $localStorage.loc = $scope.loc

        if ($scope.query == null)
            $scope.query = $localStorage.query
        else
            $localStorage.query = $scope.query

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
                                url: event.url,
                                venue_url: event.venue_url
                            }
                   )
                }
               )
            })
            $rootScope.loading = false
            $rootScope.$apply()
        });
    }

    $scope.showImage = function(image)
    {
        $scope.image = image.medium.url
        $scope.showing = true
    }
}])