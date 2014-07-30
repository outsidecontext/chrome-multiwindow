# Chrome Multi-Window Animation Test

## Summary

socket.io prototype to test multi-chrome window animation.

## Local Development

### Dependencies
1. [Node.js](http://nodejs.org/)

### Setup
1. clone the repo
2. Install system dependencies (see above)
3. Switch to the root of your working copy
4. `npm install`
5. `node app.js`
6. Open up three seperate chrome windows and browse to http://localhost:3000/{1/2/3}.html. Hit 'S' to animate.

### Additionals
Use supervisor to auto-restart node server when .js files change:
1. `npm install -g` [supervisor](https://github.com/isaacs/node-supervisor)
2. Use `supervisor app.js` rather than `node app.js` to run server
3. Save JavaScript files and see server rerun instantly


## Authors
- [Chris](mailto:me@chrismullany.com)