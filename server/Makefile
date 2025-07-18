# Makefile for MLOps Predictive Maintenance Project

.PHONY: help train train-all test coverage lint clean docker-build docker-up docker-down mlflow-ui

help:
	@echo ""
	@echo "Available commands:"
	@echo "  make train            Train single RUL model (default dataset)"
	@echo "  make train-all        Train all RUL models (FD001–FD004)"
	@echo "  make test             Run all unit tests"
	@echo "  make coverage         Show test coverage"
	@echo "  make lint             Lint code with flake8"
	@echo "  make clean            Remove compiled artifacts and model outputs"
	@echo "  make docker-build     Build Docker containers"
	@echo "  make docker-up        Run FastAPI and MLflow services"
	@echo "  make docker-down      Stop Docker services"
	@echo "  make mlflow-ui        Run MLflow Tracking UI"
	@echo ""

train:
	python model/training.py --dataset FD001

train-all:
	bash scripts/train_all.sh

test:
	pytest tests

coverage:
	coverage run -m pytest tests
	coverage report -m

lint:
	flake8 model app tests

clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -exec rm -r {} +
	rm -f model_registry/*.pkl
	rm -f model_registry/*.json
	rm -f reports/*.png
	rm -f inference/*.csv
	rm -f .coverage
	rm -f .flake8
	rm -f .mypy

docker-build:
	docker-compose -f deployment/docker-compose.yml build

docker-up:
	docker-compose -f deployment/docker-compose.yml up

docker-down:
	docker-compose -f deployment/docker-compose.yml down

mlflow-ui:
	mlflow ui --backend-store-uri ${MLFLOW_TRACKING_URI}
