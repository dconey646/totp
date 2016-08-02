# totp
Chrome extension for generating one time passwords.

# Installation instructions
Follow the steps closely below and the plugin should work for you:

1. First clone the repo : git@github.com:dconey646/totp.git - Inside the MOTDEV directory is probably best to keep them all together.
2. In the directory, run the following command:
      npm install gulp moment speakeasy browserify bower
   This should install all the necessary dev dependencies.
3. Once that has finished, run the following command to generate the correct javascript file: browserify app/src/pinGen.js > app/dist/bundle.js
4. Then open chrome, browse to: chrome://extensions.
5. Enable developer mode by ticking the box in the top right.
6. Then click the button "Load unpacked extension"
7. Browse to the root of the directory.
8. The browser will then add the extension to the chromebard.
9. Browse to dev.motdev.org, sign in with a user that has a security card.
10. When the site prompts you for a pin, enter the secret into the extension and the pin field will auto fill!

Enjoy!!
