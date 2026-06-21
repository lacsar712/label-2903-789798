.PHONY: dev test docker-build lint format help

PYTHON       ?= python
PIP          ?= pip
DOCKER       ?= docker
COMPOSE      ?= docker-compose

BACKEND_DIR  := backend
E2E_DIR      := e2e

help:
	@echo "Available targets:"
	@echo "  dev           Start local development server (Flask on port 5000)"
	@echo "  test          Run all tests (Python unit + e2e)"
	@echo "  docker-build  Build and start Docker containers"
	@echo "  lint          Run flake8 linting"
	@echo "  format        Run black formatter"
	@echo "  install       Install Python dependencies"

install:
	cd $(BACKEND_DIR) && $(PIP) install -r requirements.txt -r requirements-dev.txt

dev:
	cd $(BACKEND_DIR) && FLASK_APP=run.py FLASK_ENV=development $(PYTHON) run.py

test:
	cd $(BACKEND_DIR) && $(PYTHON) -m pytest -v --tb=short
	cd $(E2E_DIR) && npm test

docker-build:
	$(COMPOSE) build
	$(COMPOSE) up -d
	@echo "App running at http://localhost:12903"

lint:
	cd $(BACKEND_DIR) && $(PYTHON) -m flake8 app/

format:
	cd $(BACKEND_DIR) && $(PYTHON) -m black app/
