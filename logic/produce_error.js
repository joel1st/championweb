"use strict";
var errors = {
    champNotFound: 'That champ or role doesn\'t appear to exist!',
    pageNotFound: 'We couldn\'t find the page you are looking for - sorry!',
    serverMaintenance: 'For some reason we couldn\'t get the page to load - Chances are we\'re working on updating data - if it isn\'t fixed in the next few minutes please let us know!',
    invalidMatchup: 'That appears to be an invalid or old matchup!'
};

/**
 * A function for generating errors. 
 * @param  {string} errorType  - the key for the error type (which corresponds with the keys 
 *                             in the error object above).
 * @param  {number} errorNumber - the response number of the error (defaults to 404).
 * @return {object} - the error object.
 */
var produceError = function(errorType, errorNumber) {
    var err = new Error(errors[errorType]);
    err.status = errorNumber || 404;
    return err;
};

module.exports = produceError;