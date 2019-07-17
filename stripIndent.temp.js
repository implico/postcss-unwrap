/** 
 * Temporary, until https://github.com/sindresorhus/strip-indent/pull/9 is resolved
 * Add dependency and remove reference in package.json
*/

'use strict';

const minIndent = require('min-indent');

const stripIndent = (string, options = {}) => {
	const indent = options.indent === undefined ? minIndent(string) : options.indent;

	if (indent === 0) {
		return string;
	}

	const regex = new RegExp(`^[ \\t]{${indent}}`, 'gm');

	return string.replace(regex, '');
};

module.exports = stripIndent
