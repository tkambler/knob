.PHONY: build

build:
	@docker run --rm -v $(PWD):/opt/knob --entrypoint "bash" --workdir /opt/knob node:16.14.2-bullseye -c "npm install && npm run build"
