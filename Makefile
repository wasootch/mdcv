pwd := $(CURDIR)

run:
	docker run --rm -v "$(pwd)/src:/work" -w /work mcr.microsoft.com/playwright:v1.59.0-jammy \
		bash -c "npm install marked playwright && node render.js"