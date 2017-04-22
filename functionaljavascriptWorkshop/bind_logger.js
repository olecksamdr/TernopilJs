function logger(namespace) {
	let args = [namespace].concat([].slice.call(arguments));
	return console.log.bind(console, namespace);
}

module.exports = logger;
