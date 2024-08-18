---
{"dg-publish":true,"permalink":"/python-coaching/introduction-to-pandas-and-data-frames/"}
---


Pandas is a powerful and flexible Python library designed for data manipulation and analysis. It provides data structures like Series and DataFrames, which are ideal for handling and analyzing structured data, similar to how you would in databases or Excel spreadsheets.

#### **Series**
- **One-Dimensional Array-Like Structure:**
    - A Series is a one-dimensional array-like object capable of holding any data type (integers, strings, floats, etc.). Think of it as a column in an Excel sheet. Each item in a Series has a unique label, known as the index.

- **Creating a Series:**
    - You can create a Series from a list, NumPy array, or even a dictionary. When creating a Series, you can define custom index labels; otherwise, Pandas assigns default integer indices starting from 0.
    ```python
    import pandas as pd

    # Creating a Series from a list
    data = [10, 20, 30, 40]
    s = pd.Series(data, index=["a", "b", "c", "d"])
    
    # Creating a Series from a dictionary
    data = {"a": 10, "b": 20, "c": 30, "d": 40}
    s = pd.Series(data)
    ```

- **Accessing Data in a Series:**
    - You can access elements in a Series using either their index label or numerical position.
    ```python
    print(s["a"])  # Access by label
    print(s[0])    # Access by position
    ```

#### **Labels**
- **Customizing Index Labels:**
    - Index labels are crucial when you need to work with data that has a specific order or meaning. You can customize these labels while creating the Series or by assigning them later.
    ```python
    s.index = ["w", "x", "y", "z"]  # Reassigning index labels
    ```

- **Selecting Data with Custom Labels:**
    - Custom labels make it easier to access specific data points in your Series, especially when dealing with non-numeric data.
    ```python
    print(s["w"])  # Now accessible using the new label
    ```

#### **DataFrames**
- **Two-Dimensional Table-Like Structure:**
    - A DataFrame is a two-dimensional, size-mutable, and heterogeneous data structure with labeled axes (rows and columns). It can be thought of as a table in a database or a data sheet in Excel, where each column is a Series.

- **Creating DataFrames from Dictionaries:**
    - A common way to create a DataFrame is from a dictionary, where keys become column labels, and values are lists or arrays of data.
    ```python
    data = {
        "calories": [420, 380, 390],
        "duration": [50, 40, 45]
    }
    df = pd.DataFrame(data)
    ```

- **Creating DataFrames from Lists of Lists:**
    - You can also create a DataFrame from a list of lists, specifying column names and optionally row indices.
    ```python
    data = [
        [420, 50],
        [380, 40],
        [390, 45]
    ]
    df = pd.DataFrame(data, columns=["calories", "duration"])
    ```

- **Reading Data from CSV Files:**
    - DataFrames can be created by reading data from files such as CSVs. This is particularly useful for handling real-world data stored in files.
    ```python
    df = pd.read_csv("data.csv")
    ```

#### **Locate Row**
- **Using `loc` to Select Rows:**
    - The `loc` function allows you to access a group of rows and columns by labels or a boolean array. It's very flexible and can be used to filter data in various ways.
    ```python
    # Selecting a single row
    print(df.loc[0])  # Selects the first row

    # Selecting multiple rows
    print(df.loc[0:2])  # Selects rows from index 0 to 2
    ```

#### **Labels in DataFrames**
- **Changing Column and Row Labels:**
    - Similar to Series, the labels in a DataFrame can be customized. This is useful for making your DataFrame more readable and meaningful.
    ```python
    df.columns = ["Calories_Burned", "Workout_Duration"]
    df.index = ["Day 1", "Day 2", "Day 3"]
    ```

- **Using `loc` with Custom Labels:**
    - After relabeling, you can use `loc` to select data using these new labels.
    ```python
    print(df.loc["Day 1"])  # Access data for "Day 1"
    ```

#### **Inspecting DataFrames**
- **Using `head()` and `tail()` Methods:**
    - The `head()` and `tail()` methods allow you to quickly view the first and last few rows of a DataFrame, respectively. This is useful for getting a quick look at your data.
    ```python
    print(df.head())  # View first 5 rows
    print(df.tail())  # View last 5 rows
    ```

- **Understanding Data Types with `dtypes`:**
    - The `dtypes` attribute provides information about the data types of each column in the DataFrame, helping you understand the structure of your data.
    ```python
    print(df.dtypes)
    ```

- **Summary Statistics with `describe()`:**
    - The `describe()` method generates descriptive statistics that summarize the central tendency, dispersion, and shape of a dataset’s distribution, excluding `NaN` values.
    ```python
    print(df.describe())
    ```
