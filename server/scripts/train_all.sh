#!/bin/bash

echo "🔥 Starting full training pipeline..."

for dataset in FD001 FD002 FD003 FD004; do
    echo "🚀 Training on $dataset..."
    python model/training.py --dataset $dataset
done

echo "✅ All models trained successfully!"
