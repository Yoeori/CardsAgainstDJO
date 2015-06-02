# Cards Against DJO

## Summary

A web version of [Cards Against Humanity](http://cardsagainsthumanity.com/) made by Jelmerro & Yoeori.  
We are running a live demo on [cardsagainstdjo.ml](http://cardsagainstdjo.ml).  
We included a bunch of packs ourselves, but custom packs can be added using the 5-digit code from [Cardcast](http://cardcastgame.com).  
Built on Node.js 0.12.2.  
Still in early development.  

## Usage

First of all you need node.js to run this.  
It can be found on [nodejs.org](https://nodejs.org/).  
After that we need a bunch of packages.  
Run this command in the root of the project to obtain them:
```
npm install
```
Now you need a database for all your users.  
Go to your database and add database.sql from the 'server' folder to your database.  
After that you need to configure a few settings.  
In the main project folder create a 'config.json'.  
Then use the 'config.example.json' to fill your own config and save it with your settings.  
It is recommended to keep the example in case your settings don't work.  
After that everything should be ready to go.  
From now on simply go to the root of the project and run:
```
node app.js
```

## License
For the full license please click on the image below.  
[!["Creative Commons License"](https://i.creativecommons.org/l/by-nc-sa/2.0/88x31.png)](http://creativecommons.org/licenses/by-nc-sa/2.0/)
