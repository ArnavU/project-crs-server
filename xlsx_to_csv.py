import pandas as pd

# Path to the XLSX file
xlsx_file = "./uploads/cutoffExcel.xlsx"

# Path to the CSV file
csv_file = "./uploads/cutoffCSV.csv"

# Read the XLSX file into a pandas DataFrame
df = pd.read_excel(xlsx_file)

# Write the DataFrame to a CSV file
df.to_csv(csv_file, index=False)
