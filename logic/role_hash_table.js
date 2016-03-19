"use strict";
/**
 * The varius role keys and values.
 * Used for determining legitimate roles for champion page routes.
 */
var roleList = {
	'Top': 'TOP',
	'Middle': 'MIDDLE',
	'Support': 'DUO_SUPPORT',
	'ADC': 'DUO_CARRY',
	'Jungle': 'JUNGLE',
	'top': 'TOP',
	'middle': 'MIDDLE',
	'support': 'DUO_SUPPORT',
	'adc': 'DUO_CARRY',
	'jungle': 'JUNGLE',
	'adcsupport': 'ADCSUPPORT',
	'synergy': 'SYNERGY'
};

var roleKey = {
	'TOP': 'Top',
	'MIDDLE': 'Middle',
	'DUO_SUPPORT': 'Support',
	'DUO_CARRY': 'ADC',
	'JUNGLE': 'Jungle',
	'ADCSUPPORT': 'adcsupport',
	'SYNERGY': 'synergy'
};

exports.roleList = roleList;
exports.roleKey = roleKey;