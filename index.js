const exec = require('util').promisify(require('child_process').exec);
const Path = require('path');

module.exports = function(inputs, output, options) {
	return Promise.all(inputs.map((input) => {
		return exec(`patch --backup --forward --strip 0 --quiet --reject-file - <${output}`, {
			cwd: Path.dirname(input)
		}).catch(function(err) {
			if (err.stdout && (err.stdout.indexOf('File to patch') > 0 || !err.stdout.indexOf('ignored'))) {
				// eslint-disable-next-line no-console
				console.info(err.stdout);
			}
			if (err.stderr) {
				console.error(err.stderr);
			}
		});
	}));
};
