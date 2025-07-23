#!/bin/bash

RAW_DIR="data/raw"
PROCESSED_DIR="data/processed"
UTIL_SCRIPT="utils/preprocess.py"

echo "👀 Watching $RAW_DIR for new .txt files..."

inotifywait -m -e close_write --format "%f" "$RAW_DIR" | while read FILE; do
    EXT="${FILE##*.}"
    
    if [[ "$EXT" == "txt" ]]; then
        BASENAME="${FILE%.*}"
        INPUT_PATH="$RAW_DIR/$FILE"
        OUTPUT_PATH="$PROCESSED_DIR/$BASENAME.txt"

        if [[ -f "$OUTPUT_PATH" ]]; then
            echo "⚠️  File $BASENAME.txt already processed. Skipping."
        else
            echo "⚙️  Processing $FILE..."
            python "$UTIL_SCRIPT" "$INPUT_PATH" "$OUTPUT_PATH"

            if [[ $? -eq 0 ]]; then
                echo "✅ $FILE processed and saved to $OUTPUT_PATH"
            else
                echo "❌ Error processing $FILE"
            fi
        fi
    fi
done
