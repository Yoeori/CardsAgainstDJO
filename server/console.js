module.exports = {

  log: function(message) {
    console.log("LOG   - " + message);
  },

  info: function(message) {
    console.log("INFO  - " + message);
  },

  error: function(message) {
    console.log("ERROR - " + message);
  },

  warn: function(message) {
    console.log("WARN  - " + message);
  },

  dir: console.dir,
  time: console.time,
  timeEnd: console.timeEnd,
  trace: console.trace,
  assert: console.assert,
};
