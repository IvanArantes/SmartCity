var modules = ['zmTemplates', 'zmGlobalServices', 'other modules ...'];
var dependencies = ['ngSanitize', 'other dependencies ...'];
var isMobile = typeof(ionic)!=='undefined' && (ionic.Platform.is("ios") || ionic.Platform.is("android"));
if(isMobile) {
    dependencies.push('ionic');
}

var ngModule = angular.module('sampleApp', dependencies.concat(modules))
    .config(function ($locationProvider, $compileProvider, AnalyticsProvider) {
       $locationProvider.html5Mode(true); // enable html5 mode
       // other pieces of code.
    })
    .run(function (application, $rootScope) {
       application.setPageTitle();
       $rootScope.$on('$stateChangeSuccess', function (event) {
          application.setPageTitle();
       });
       // other pieces of code.
   });
if(isMobile) {
   ngModule.run(function ($ionicPlatform) {
       $ionicPlatform.ready(function() {
       // Anything native should go here, like StatusBar.styleLightContent()
       if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
       }
    });
}
