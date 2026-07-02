# import sys
# import os

# # Add project root to Python path
# PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
# sys.path.append(PROJECT_ROOT)

# from ingestion.parquet_loader import load_parquet_data

# # train_df = load_parquet_data("data/banking_qa/train.parquet")
# train_df = load_parquet_data(
#     r"C:\New folder\OneDrive\Desktop\Python Program\train-00000-of-00001.parquet"
# )


# print(train_df.head())
# print(train_df.columns)



import sys
import os
import pandas as pd

# --- Fix Python path ---
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(PROJECT_ROOT)

from ingestion.parquet_loader import load_parquet_data

# --- EXACT FILE PATH (PASTE FROM COPY AS PATH) ---
train_path = r"C:\New folder\OneDrive\Desktop\Python Program\train-00000-of-00001.parquet"

train_df = load_parquet_data(train_path)

print(train_df.head())
print(train_df.columns)
