# Makefile for MLOps Predictive Maintenance Project

.PHONY: help train test coverage lint clean

help:
	@echo ""
	@echo "Available commands:"
	@echo "  make train        Train all RUL models (FD001–FD004)"
	@echo "  make test         Run all unit tests"
	@echo "  make coverage     Show test coverage"
	@echo "  make lint         Lint code with flake8"
	@echo "  make clean        Remove compiled artifacts and model outputs"
	@echo ""

train:
	python models/training.py

test:
	pytest tests

coverage:
	coverage run -m pytest tests
	coverage report -m

lint:
	flake8 models app tests

clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -exec rm -r {} +
	rm -f model_registry/*.pkl
	rm -f model_registry/*.json
	rm -f reports/*.png
	rm -f .coverage
	rm -f .flake8
	rm -f .mypy