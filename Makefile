CORDOVA-ANDROID="android/cordova/"
CORDOVA-IOS="ios/cordova/"

webapp: api-webapp main-webapp

android: api-android main-android

ios: api-ios main-ios

api-android:
	sed -i '' 's/[\/]*\(.*home.*\)/\1/' public/js/api.js
	sed -i '' 's/^\([^\/].*localhost.*\)/\/\/\1/' public/js/api.js
	sed -i '' 's/"me"/"android"/' public/js/api.js

main-android:
	sed -i '' 's/[\/]*\(.*cordova-2.*\)/\1/' public/js/main.js
	sed -i '' 's/^\([^\/].*cordova-empty.*\)/\/\/\1/' public/js/main.js
	sed -i '' 's/^\([^\/].*cordova-ios.*\)/\/\/\1/' public/js/main.js
	sed -i '' "s/\'\(\/socket\.io\/socket\.io\)/\'http:\/\/home\.axelcdv\.com:3000\1/" public/js/main.js

run-android:
	$(CORDOVA-ANDROID)run

run-ios:
	$(CORDOVA-IOS)run

api-webapp:
	sed -i '' 's/[\/]*\(.*localhost.*\)/\1/' public/js/api.js
	sed -i '' 's/^\([^\/].*home.*\)/\/\/\1/' public/js/api.js
	sed -i '' 's/"android"/"me"/' public/js/api.js
	sed -i '' 's/"ios"/"me"/' public/js/api.js

main-webapp:
	sed -i '' 's/[\/]*\(.*cordova-empty.*\)/\1/' public/js/main.js
	sed -i '' 's/^\([^\/].*cordova-2.*\)/\/\/\1/' public/js/main.js
	sed -i '' 's/^\([^\/].*cordova-ios.*\)/\/\/\1/' public/js/main.js
	sed -i '' "s/http.*3000//" public/js/main.js

main-ios:
	sed -i '' 's/[\/]*\(.*cordova-ios.*\)/\1/' public/js/main.js
	sed -i '' 's/^\([^\/].*cordova-2.*\)/\/\/\1/' public/js/main.js
	sed -i '' 's/^\([^\/].*cordova-empty.*\)/\/\/\1/' public/js/main.js
	sed -i '' "s/\'\(\/socket\.io\/socket\.io\)/\'http:\/\/home\.axelcdv\.com:3000\1/" public/js/main.js


api-ios:
	sed -i '' 's/[\/]*\(.*home.*\)/\1/' public/js/api.js
	sed -i '' 's/^\([^\/].*localhost.*\)/\/\/\1/' public/js/api.js
	sed -i '' 's/"me"/"ios"/' public/js/api.js


