http://mherman.org/blog/2015/09/26/social-authentication-in-node-dot-js-with-passport/

# Using Passport.js in a web app behind a corporate firewall

Hi, just to let you know the workarround that I used to run this code within a corporate firewall, (in general any code behind a firewall brings some headaches) 

For the case of get your web app authenticated by Github using passport.js I got the following isse: 

[Failed to obtain access token using Github Authentication](https://github.com/jaredhanson/passport/issues/492)

The thing is that [oauth2.js](https://github.com/ciaranj/node-oauth/blob/master/lib/oauth2.js) does not take in consideration the proxy environment variables when it performed the requests. Blocking the web app to get authenticated (receive the access token and the github user info)

So I tried with this [workarround](http://stackoverflow.com/questions/33639337/use-passport-js-behind-corporate-firewall-for-facebook-strategy?answertab=oldest#tab-top) that let know to the oauth2.js that uses the proxy to communicate. 

You usually will find the oauth2.js code that needs to adapt at: your_project/node_modules/oauth/lib/oauth.js

```
var querystring= require('querystring'),
    crypto= require('crypto'),
    https= require('https'),
    http= require('http'),
    URL= require('url'),
    OAuthUtils= require('./_utils');

// line codes to add
var HttpsProxyAgent = require('https-proxy-agent');

if (process.env['https_proxy']) {
    httpsProxyAgent = new HttpsProxyAgent(process.env['https_proxy']);
}

....
  // line codes to add
  options.agent = httpsProxyAgent;

  this._executeRequest( http_library, options, post_body, callback );
}

exports.OAuth2.prototype._request= function(method, url, headers, post_body, access_token, callback) {

...

```

So maybe this could help.
