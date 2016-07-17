test:
	@node_modules/.bin/tape test/test.js

bench:
	@node_modules/.bin/matcha test/bench.js

.PHONY: test bench
