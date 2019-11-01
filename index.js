const exec = require('util').promisify(require('child_process').exec);

module.exports = function(inputs, output, options) {
	return Promise.all(inputs.map((input) => {
		return exec(`patch --backup --forward --strip 0 --quiet --reject-file - <${output}`, {
			cwd: input
		}).catch(function(err) {
			if (err.stdout && !err.stdout.indexOf('ignored')) console.log(err.stdout);
			if (err.stderr) console.error(err.stderr);
		});
	}));
};
