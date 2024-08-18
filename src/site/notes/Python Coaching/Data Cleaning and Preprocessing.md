---
{"dg-publish":true,"permalink":"/python-coaching/data-cleaning-and-preprocessing/"}
---


Data cleaning and pre-processing are essential steps in preparing data for analysis. This involves handling missing data, renaming columns, changing data types, and normalizing data. Proper data cleaning ensures the accuracy and reliability of your analysis.

#### **Identifying Missing Data**
- **Checking for Missing Values with `isnull()` and `notnull()`:**
    - Missing data can occur due to various reasons like data entry errors or unrecorded observations. Identifying these missing values is the first step in data cleaning.
    - The `isnull()` function returns a DataFrame of the same shape as the original, with `True` for missing values and `False` for non-missing values.
    - Conversely, `notnull()` returns `True` for non-missing values and `False` for missing values.
    ```python
    import pandas as pd

    data = {"col1": [1, 2, None], "col2": [4, None, 6]}
    df = pd.DataFrame(data)

    # Identify missing data
    missing_data = df.isnull()
    not_missing_data = df.notnull()
    ```

- **Counting Missing Values:**
    - You can count the number of missing values in each column using the `sum()` function on the result of `isnull()`.
    ```python
    missing_count = df.isnull().sum()
    ```

#### **Handling Missing Data**
- **Removing Missing Data with `dropna()`:**
    - The `dropna()` function is used to remove rows or columns that contain missing values. This can be done based on specific criteria like removing rows only if all columns have `NaN` values (`how='all'`), or if any column has a `NaN` value (`how='any'`).
    ```python
    # Remove rows with any missing values
    df_cleaned = df.dropna()

    # Remove columns with any missing values
    df_cleaned = df.dropna(axis=1)
    ```

- **Filling Missing Data with `fillna()`:**
    - Instead of dropping missing data, you can fill them with a specific value using `fillna()`. Common strategies include filling with a constant value, the mean, median, or the mode of the column.
    ```python
    # Fill missing values with a constant value
    df_filled = df.fillna(0)

    # Fill missing values with the mean of the column
    df_filled = df.fillna(df.mean())
    ```

- **Using Interpolation for Missing Data:**
    - Interpolation is a method of estimating missing values within the range of a discrete set of known data points. The `interpolate()` function in Pandas allows you to estimate missing values using linear or other interpolation methods.
    ```python
    # Linear interpolation to fill missing values
    df_interpolated = df.interpolate()
    ```

#### **Renaming Columns**
- **Renaming Columns with `rename()` and `columns` Attribute:**
    - Renaming columns is often necessary for better readability and understanding of your data. You can rename columns using the `rename()` method or by directly modifying the `columns` attribute of the DataFrame.
    ```python
    # Using rename()
    df_renamed = df.rename(columns={"col1": "Column_1", "col2": "Column_2"})

    # Using columns attribute
    df.columns = ["Column_1", "Column_2"]
    ```

#### **Changing Data Types**
- **Converting Data Types with `astype()`:**
    - Data types in a DataFrame can affect the performance of your analysis and the operations you can perform. The `astype()` function allows you to convert data types of columns to more appropriate ones, like converting strings to integers or floats to categories.
    ```python
    # Convert a column to integer
    df["Column_1"] = df["Column_1"].astype(int)
    ```

- **Using `pd.to_numeric()` and `pd.to_datetime()` for Conversions:**
    - Pandas provides specialized functions like `pd.to_numeric()` and `pd.to_datetime()` to convert strings or other data types to numeric and datetime formats, respectively.
    ```python
    # Convert a column to numeric (useful for error handling)
    df["Column_1"] = pd.to_numeric(df["Column_1"], errors='coerce')

    # Convert a column to datetime
    df["Date_Column"] = pd.to_datetime(df["Date_Column"])
    ```

#### **Normalization Techniques**
- **Min-Max Scaling:**
    - Min-Max scaling, also known as normalization, transforms data to a fixed range, usually [0, 1]. This is useful in machine learning algorithms where data needs to be on a consistent scale.
    ```python
    from sklearn.preprocessing import MinMaxScaler

    scaler = MinMaxScaler()
    df_scaled = pd.DataFrame(scaler.fit_transform(df), columns=df.columns)
    ```

- **Standardization (Z-score Scaling):**
    - Standardization scales data to have a mean of 0 and a standard deviation of 1. This is often used in algorithms that assume a Gaussian distribution of the data.
    ```python
    from sklearn.preprocessing import StandardScaler

    scaler = StandardScaler()
    df_standardized = pd.DataFrame(scaler.fit_transform(df), columns=df.columns)
    ```

#### **Applying Normalization**
- **Using Pandas to Normalize Data:**
    - You can also apply basic normalization techniques directly using Pandas by using vectorized operations.
    ```python
    # Min-Max scaling using Pandas
    df["Column_1"] = (df["Column_1"] - df["Column_1"].min()) / (df["Column_1"].max() - df["Column_1"].min())
    ```

- **Implementing Basic Scaling with `apply()` and `transform()`:**
    - The `apply()` and `transform()` methods in Pandas allow you to apply functions to entire DataFrames or individual Series. This is useful for applying custom scaling or normalization functions.
    ```python
    # Using apply to normalize a column
    df["Column_1"] = df["Column_1"].apply(lambda x: (x - df["Column_1"].min()) / (df["Column_1"].max() - df["Column_1"].min()))

    # Using transform to standardize a column
    df["Column_1"] = df["Column_1"].transform(lambda x: (x - x.mean()) / x.std())
    ```
