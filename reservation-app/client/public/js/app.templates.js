(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('index.html',
    '<!doctype html>\n' +
    '\n' +
    '<html id="ng-app" ng-app="reservation-app" ng-controller="CtrlApp">\n' +
    '\n' +
    '<head>\n' +
    '  <title ng-bind="appName"></title>\n' +
    '\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
    '  <meta http-equiv="pragma" content="no-cache">\n' +
    '\n' +
    '  <!-- vendor styles -->\n' +
    '  <!--<link rel="stylesheet" href="css/bootstrap.min.css?v=APP_VERSION">-->\n' +
    '  <!--<link rel="stylesheet" href="css/bootstrap-theme.min.css?v=APP_VERSION">-->\n' +
    '  <!--<link rel="stylesheet" href="css/font-awesome.min.css?v=APP_VERSION">-->\n' +
    '\n' +
    '  <!-- app styles -->\n' +
    '  <link rel="stylesheet" href="css/vendor.css?v=APP_VERSION">\n' +
    '  <!--<link rel="stylesheet" href="css/app.css?v=APP_VERSION">-->\n' +
    '\n' +
    '  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->\n' +
    '  <!--[if lt IE 9]>\n' +
    '  <link rel="stylesheet" href="css/ie.css?v=APP_VERSION">\n' +
    '  <script src="js/es5-shim.min.js?v=APP_VERSION"></script>\n' +
    '  <script src="js/html5shiv.js?v=APP_VERSION"></script>\n' +
    '  <script src="js/respond.min.js?v=APP_VERSION"></script>\n' +
    '  <script>var isLtIe9 = true;</script>\n' +
    '  <![endif]-->\n' +
    '\n' +
    '</head>\n' +
    '\n' +
    '<body layout="column">\n' +
    '\n' +
    '\n' +
    '<div style="width: 100%">\n' +
    '  <div ng-include="\'common/toolbar.tpl.html\'"></div>\n' +
    '</div>\n' +
    '\n' +
    '<div layout="row">\n' +
    '\n' +
    '  <div ng-include="\'common/menu_left.tpl.html\'"></div>\n' +
    '\n' +
    '  <div layout="column" flex id="content">\n' +
    '    <md-content layout="column" flex class="md-padding">\n' +
    '      <!-- This is the main page that gets displayed. -->\n' +
    '      <div ui-view>\n' +
    '      </div>\n' +
    '    </md-content>\n' +
    '  </div>\n' +
    '\n' +
    '  <div ng-include="\'common/menu_right.tpl.html\'"></div>\n' +
    '\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '<script src="js/vendor.js"></script>\n' +
    '<script src="js/app.js"></script>\n' +
    '<script src="js/app.templates.js"></script>\n' +
    '</body>\n' +
    '</html>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('schedule/schedule.list.tpl.html',
    '<div>\n' +
    '\n' +
    '    <div layout="row" layout-align="space-between center">\n' +
    '        <div></div>\n' +
    '        <div>\n' +
    '            <h2>\n' +
    '\n' +
    '            <ng-md-icon icon="chevron_left" aria-label="Previous" ng-click="vm.onClickMonthPrevious()"></ng-md-icon>\n' +
    '            {{vm.data[0].month.text}}\n' +
    '            <ng-md-icon icon="chevron_right" aria-label="Next" ng-click="vm.onClickMonthNext()"></ng-md-icon>\n' +
    '            </h2>\n' +
    '        </div>\n' +
    '        <div>\n' +
    '        <ng-md-icon icon="update" aria-label="Refresh" ng-click="vm.onClickRefresh()"></ng-md-icon>\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '\n' +
    '    <div ng-show="vm.data">\n' +
    '        <md-content>\n' +
    '\n' +
    '\n' +
    '            <md-list>\n' +
    '\n' +
    '                <md-list-item class="md-2-line" ng-repeat="server in vm.data">\n' +
    '                    <!--TODO: Move to CSS-->\n' +
    '                    <div class="md-list-item-text"\n' +
    '                         ng-style="{\'background-color\':\'lightgray\', \'border\':\'solid black 1px\'}">\n' +
    '\n' +
    '                        <div layout="row">\n' +
    '                            <div flex="initial">\n' +
    '                                <h3>{{server.name}} &nbsp; - &nbsp;</h3>\n' +
    '                            </div>\n' +
    '                            <div flex="grow">\n' +
    '                                <p>{{server.description}}</p>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '\n' +
    '                        <!--TODO: Move to CSS-->\n' +
    '                        <div layout="row" layout-wrap\n' +
    '                             ng-style="{\'border-top\':\'solid black 1px\',\'background-color\':\'white\'}">\n' +
    '                            <div flex="none" ng-repeat="day in server.month.days"\n' +
    '\n' +
    '                                 ng-style="day.approval.approved === \'APPROVED\' &&\n' +
    '                                 {\'background-color\':\'pink\',\'width\':\'27px\'} ||\n' +
    '                                 (day.approval.approved === \'PENDING\' &&\n' +
    '                                 {\'background-color\':\'yellow\',\'width\':\'27px\'} ||\n' +
    '                                 {\'width\':\'27px\'}) "\n' +
    '                            >\n' +
    '                                <div ng-click="vm.onClickDay(server, day)" ng-style="{\'text-align\': \'center\'}">\n' +
    '                                    {{day.idx}}\n' +
    '                                </div>\n' +
    '                                <md-tooltip ng-show="day.approval">\n' +
    '                                    {{server.name }} is assigned\n' +
    '                                    to {{ day.approval. user }}\n' +
    '                                    on {{ day.date }}\n' +
    '                                </md-tooltip>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                        <div layout="row" layout-wrap>\n' +
    '                        </div>\n' +
    '\n' +
    '\n' +
    '                    </div>\n' +
    '                </md-list-item>\n' +
    '            </md-list>\n' +
    '        </md-content>\n' +
    '    </div>\n' +
    '\n' +
    '    <!--<div>-->\n' +
    '    <!--<br/>-->\n' +
    '    <!--<hr/>-->\n' +
    '    <!--<h2>This is the raw data for dev </h2>-->\n' +
    '    <!--<p>{{vm.data}}</p>-->\n' +
    '\n' +
    '    <!--</div>-->\n' +
    '\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('login/login.tpl.html',
    '<div class="login">\n' +
    '\n' +
    '\n' +
    '    <div layout="column" layout-padding ng-cloak>\n' +
    '\n' +
    '        <h1>Login</h1>\n' +
    '        <md-content class="md-no-momentum">\n' +
    '\n' +
    '            <form name="formLogin" ng-submit="vm.loginUser(formLogin.$valid)" novalidate>\n' +
    '\n' +
    '                <md-input-container class="md-block">\n' +
    '                    <label>Name</label>\n' +
    '                    <input type="text" md-maxlength="30" required md-no-asterisk name="user" ng-model="vm.user.name">\n' +
    '\n' +
    '                    <div ng-messages="formLogin.name.$error">\n' +
    '                        <div ng-message="required">The name is required.</div>\n' +
    '                        <div ng-message="md-maxlength">The name must be less than 30 characters long.</div>\n' +
    '                    </div>\n' +
    '                </md-input-container>\n' +
    '\n' +
    '\n' +
    '                <md-input-container class="md-block">\n' +
    '                    <label>E-Mail</label>\n' +
    '                    <input ng-model="vm.user.email" type="email" name="email" required>\n' +
    '\n' +
    '                    <div ng-messages="formLogin.email.$error">\n' +
    '                        <div ng-message="required">The email is required.</div>\n' +
    '                    </div>\n' +
    '                </md-input-container>\n' +
    '\n' +
    '\n' +
    '                <div>\n' +
    '                    <md-button type="submit">Submit</md-button>\n' +
    '                </div>\n' +
    '\n' +
    '            </form>\n' +
    '        </md-content>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('servers/servers.add.tpl.html',
    '<div class="servers">\n' +
    '\n' +
    '\n' +
    '    <div layout="column" layout-padding ng-cloak>\n' +
    '\n' +
    '        <h1>Add Server</h1>\n' +
    '        <md-content class="md-no-momentum">\n' +
    '\n' +
    '            <form name="formServers" ng-submit="vm.addServer(formServers.$valid)" novalidate>\n' +
    '\n' +
    '                <md-input-container class="md-block">\n' +
    '                    <label>Name</label>\n' +
    '                    <input type="text" md-maxlength="30" required md-no-asterisk name="user" ng-model="vm.server.name">\n' +
    '\n' +
    '                    <div ng-messages="formServers.name.$error">\n' +
    '                        <div ng-message="required">The server name is required.</div>\n' +
    '                        <div ng-message="md-maxlength">The server name must be less than 30 characters long.</div>\n' +
    '                    </div>\n' +
    '                </md-input-container>\n' +
    '\n' +
    '\n' +
    '                <md-input-container class="md-block">\n' +
    '                    <label>Description</label>\n' +
    '                    <input ng-model="vm.server.description" type="text" name="description" required>\n' +
    '\n' +
    '                    <div ng-messages="formServers.description.$error">\n' +
    '                        <div ng-message="required">The description is required.</div>\n' +
    '                    </div>\n' +
    '                </md-input-container>\n' +
    '\n' +
    '\n' +
    '                <div>\n' +
    '                    <md-button type="submit">Submit</md-button>\n' +
    '                </div>\n' +
    '\n' +
    '            </form>\n' +
    '            <div ng-show="vm.errors.length">\n' +
    '                <h2>ERRORS</h2>\n' +
    '                {{vm.errors}}\n' +
    '            </div>\n' +
    '        </md-content>\n' +
    '    </div>\n' +
    '</div>');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('common/menu_left.tpl.html',
    '<div class="menu_left" ng-hide="user === null">\n' +
    '    <md-sidenav layout="column"\n' +
    '                class="md-sidenav-left md-whiteframe-z2"\n' +
    '                md-component-id="left"\n' +
    '                md-is-locked-open="$mdMedia(\'gt-sm\')">\n' +
    '\n' +
    '\n' +
    '        <md-toolbar class="md-hue-2">\n' +
    '            <div layout="column" class="md-toolbar-tools-bottom inset">\n' +
    '                <div>Menu</div>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '        <md-list layout="column">\n' +
    '            <md-item>\n' +
    '                <md-button ng-click="goToState(\'schedule_list\')">\n' +
    '                    Server Schedule\n' +
    '                </md-button>\n' +
    '            </md-item>\n' +
    '            <md-item>\n' +
    '                <md-button ng-click="goToState(\'servers_add\')">\n' +
    '                    Add Server\n' +
    '                </md-button>\n' +
    '            </md-item>\n' +
    '\n' +
    '        </md-list>\n' +
    '\n' +
    '    </md-sidenav>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('common/menu_right.tpl.html',
    '<div class="menu_right" ng-hide="user === null">\n' +
    '    <md-sidenav layout="column"\n' +
    '                class="md-sidenav-right md-whiteframe-z2"\n' +
    '                md-component-id="right">\n' +
    '\n' +
    '        <md-toolbar class="md-hue-2">\n' +
    '            <div layout="column" class="md-toolbar-tools-bottom inset">\n' +
    '\n' +
    '                <div>{{user.name}}</div>\n' +
    '                <div>{{user.email}}</div>\n' +
    '            </div>\n' +
    '        </md-toolbar>\n' +
    '        <md-list layout="column">\n' +
    '            <md-item>\n' +
    '                <md-button ng-click="alert(\'TODO\');">\n' +
    '                    Settings\n' +
    '                </md-button>\n' +
    '            </md-item>\n' +
    '            <md-item>\n' +
    '                <md-button ng-click="logoutUser(\'login\')">\n' +
    '                    Logout\n' +
    '                </md-button>\n' +
    '            </md-item>\n' +
    '        </md-list>\n' +
    '\n' +
    '\n' +
    '    </md-sidenav>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('app.templates');
} catch (e) {
  module = angular.module('app.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('common/toolbar.tpl.html',
    '<md-toolbar layout="row" layout-align="start end">\n' +
    '\n' +
    '    <div class="md-toolbar-tools">\n' +
    '\n' +
    '        <md-button ng-click="toggleSidenav(\'left\')" hide-gt-sm\n' +
    '                   class="md-icon-button"\n' +
    '                   ng-show="user !== null">\n' +
    '            <ng-md-icon icon="menu" aria-label="Menu"></ng-md-icon>\n' +
    '        </md-button>\n' +
    '\n' +
    '        <h1 class="md-toolbar-tools">Team 6 Server Reservation System</h1>\n' +
    '\n' +
    '        <!-- Span to move everything else to the right-->\n' +
    '        <span flex> </span>\n' +
    '        <md-button ng-click="toggleSidenav(\'right\')"\n' +
    '                   class="md-icon-button"\n' +
    '                   ng-show="user !== null">\n' +
    '            <ng-md-icon icon="settings" aria-label="Settings"></ng-md-icon>\n' +
    '        </md-button>\n' +
    '    </div>\n' +
    '</md-toolbar>\n' +
    '');
}]);
})();
