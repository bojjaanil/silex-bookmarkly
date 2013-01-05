//service concernant la gestion d'un utilisateur

var ApplicationServices = angular.module("ApplicationServices", []);

/** manage user API calls **/
ApplicationServices.factory("UserService", ['$http', '$window',
    function($http, $window) {
        var config = {cache: true};
        return {
            getCurrentUser: function(success, error) {
                $http.get("/json/user").success(success).error(error || function() {
                });
            },
            isLogged: function() {
            },
            register: function(user, success, error) {
                $http.post("/json/register", user).success(success).error(error);
            },
            login: function(user, success, error) {
                $http.post("/json/login", user).success(success).error(error);
            },
            logout: function(success, error) {
                $http.post("/json/logout").success(success).error(error);
            }
        };
    }
]);

/** manage bookmark API calls **/
ApplicationServices.factory("BookmarkService", ['$http', function($http) {
        var config = {cache: true};
        return {
            get: function(success, error) {
                $http.get("/json/bookmark", config).success(success).error(error);
            },
            put: function(bookmark, success, error) {
                $http.put("/json/bookmark", bookmark).success(success).error(error);
            },
            post: function(bookmark, success, error) {
                $http.post("/json/bookmark", bookmark).success(success).error(error);
            },
            "delete": function(id, success, error) {
                $http['delete']("/json/bookmark/" + id).success(success).error(error);

            },
            "getByTag": function(tagName, success, error) {
                $http.get("/json/bookmark/tag/" + tagName, config).success(success).error(error);
            },
            bookmark: {}
        };
    }]);

/** manage tag API calls **/
ApplicationServices.factory("TagService", ["$http", function($http) {
        var config = {cache: true};
        return {
            get: function(success, error) {
                $http.get("/json/tag", config).success(success).error(error);
            }
        };
    }]);

ApplicationServices.factory("ThumbnailService", function() {
    return {
        setService: function(serviceCallback) {
            this.getThumbnail = function() {
                return serviceCallback.apply(null, [].slice.call(arguments));
            };
        },
        services: {
            WIMG: function(url) {
                return "http://wimg.ca/http://" + url;
            },
            THUMBALIZR: function(url, width) {
                if (width === undefined) {
                    width = 200;
                }
                return "http://api.thumbalizr.com/?url=" + url + "&width=" + width;
            },
            ROBOTHUMB: function(url, width, height) {
                if (width === undefined)
                    width = 240;
                if (height === undefined)
                    height = 180;
                return "http://www.robothumb.com/src/?url=" + url + "&size=" + width + "x" + height;
            }
        }
    };
});