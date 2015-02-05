"use strict";
var errors = {
    champNotFound: 'That champ or role doesn\'t appear to exist!',
    serverMaintenance: 'For some reason we couldn\'t get the page to load - Chances are we\'re working on updating data - if it isn\'t fixed in the next few minutes please let us know!',
    invalidMatchup: 'That appears to be an invalid or old matchup!'
};

var produceError = function(errorType, errorNumber) {
    var err = new Error(errors[errorType]);
    err.status = errorNumber || 404;
    return err;
};

module.exports = produceError;