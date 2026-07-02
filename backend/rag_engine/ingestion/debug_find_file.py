import os

base_path = r"C:\New folder\OneDrive\Desktop\Python Program"

print("Listing files in folder:\n")

for file in os.listdir(base_path):
    print(file)






import sys
import os
import pandas as pd

# --------------------------------------------------
# Step 1: Add project root to Python path
# --------------------------------------------------
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(PROJECT_ROOT)

# --------------------------------------------------
# Step 2: Import parquet loader
# --------------------------------------------------
from ingestion.parquet_loader import load_parquet_data

# --------------------------------------------------
# Step 3: Correct file path (RELATIVE – BEST)
# --------------------------------------------------
train_path = os.path.join(
    PROJECT_ROOT, "data", "banking_qa", "train.parquet"
)

# Safety check (very important)
assert os.path.exists(train_path), f"File not found: {train_path}"

# --------------------------------------------------
# Step 4: Load parquet data
# --------------------------------------------------
train_df = load_parquet_data(train_path)

# --------------------------------------------------
# Step 5: Verify data
# --------------------------------------------------
print(" Parquet loaded successfully\n")
print(train_df.head())
print("\nColumns:")
print(train_df.columns)


