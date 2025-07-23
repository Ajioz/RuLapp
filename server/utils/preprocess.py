import sys
from pathlib import Path

def process_file(input_path, output_path):
    # TODO: Add real preprocessing logic
    with open(input_path, 'r') as infile, open(output_path, 'w') as outfile:
        for line in infile:
            outfile.write(line)  # Example passthrough

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python utils/preprocess.py <input_path> <output_path>")
        sys.exit(1)

    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])

    process_file(input_path, output_path)
