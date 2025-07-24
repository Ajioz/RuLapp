# Makefile for MLOps Predictive Maintenance Project

.PHONY: help train train-all test coverage lint clean \
        docker-build docker-up docker-down docker-train docker-watch logs \
        mlflow-ui test-html jupyter check deploy

help:
	@echo ""
	@echo "Available commands:"
	@echo "  make train              Train RUL model on default dataset (FD001)"
	@echo "  make train-all          Train all RUL models (FD001–FD004)"
	@echo "  make test               Run unit tests"
	@echo "  make coverage           Show test coverage"
	@echo "  make lint               Lint code using flake8"
	@echo "  make clean              Remove compiled artifacts and outputs"
	@echo "  make docker-build       Build all Docker containers"
	@echo "  make docker-up          Run FastAPI, MLflow, Watcher (all services)"
	@echo "  make docker-down        Stop all services"
	@echo "  make docker-train       Run training in Docker container"
	@echo "  make docker-watch       Run raw file watcher in Docker"
	@echo "  make logs               Tail application logs"
	@echo "  make mlflow-ui          Run MLflow UI locally (non-Docker)"
	@echo "  make jupyter            Launch Jupyter Lab (interactive mode)"
	@echo "  make check              Run all CI checks (lint + test)"
	@echo "  make deploy             Deploy to Kubernetes (requires kubectl)"
	@echo ""

train:
	python scripts/entrypoint.py --mode=train_all

train-all: train

test:
	pytest tests

coverage:
	coverage run -m pytest tests
	coverage report -m

lint:
	flake8 model app scripts utils tests

clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -exec rm -r {} +
	rm -f model_registry/*.pkl
	rm -f model_registry/*.json
	rm -f reports/*.png
	rm -f inference/*.csv
	rm -f .coverage
	rm -f .mypy
	rm -rf logs/*

docker-build:
	docker compose -f deployment/docker-compose.yml build

docker-up:
	docker compose -f deployment/docker-compose.yml up

docker-down:
	docker compose -f deployment/docker-compose.yml down

docker-train:
	docker compose run app --mode=train_all

docker-watch:
	docker compose run watcher

logs:
	tail -f logs/entrypoint.log

mlflow-ui:
	mlflow ui --backend-store-uri ${MLFLOW_TRACKING_URI} --port 5000

test-html:
	pytest --html=reports/test_report.html --self-contained-html

jupyter:
	@echo "🚀 Launching Jupyter Lab at http://localhost:8888 ..."
	jupyter lab --notebook-dir=notebooks --ip=0.0.0.0 --port=8888 --no-browser

check:
	@echo "🔍 Running CI checks (lint + test)..."
	make lint
	make test

deploy:
	@echo "🚀 Deploying to Kubernetes cluster..."
	@command -v kubectl >/dev/null 2>&1 || { echo '❌ kubectl is not installed'; exit 1; }
	kubectl apply -f deployment/k8s/
