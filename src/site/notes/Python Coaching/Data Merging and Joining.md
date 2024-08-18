---
{"dg-publish":true,"permalink":"/python-coaching/data-merging-and-joining/"}
---



Merging and joining are essential operations in data analysis, allowing you to combine data from multiple sources into a single DataFrame. Pandas provides powerful tools to perform these operations efficiently, enabling you to integrate datasets based on common columns or indices.

#### **Concatenation Basics**
- **Using `pd.concat()` to Concatenate DataFrames:**
    - Concatenation is the process of appending DataFrames along a particular axis (rows or columns). The `pd.concat()` function is used for this purpose, enabling you to combine DataFrames either vertically (by rows) or horizontally (by columns).
    ```python
    import pandas as pd

    df1 = pd.DataFrame({
        "A": ["A0", "A1", "A2", "A3"],
        "B": ["B0", "B1", "B2", "B3"]
    })

    df2 = pd.DataFrame({
        "A": ["A4", "A5", "A6", "A7"],
        "B": ["B4", "B5", "B6", "B7"]
    })

    # Concatenating vertically
    result = pd.concat([df1, df2])
    ```

- **Concatenating Along Rows and Columns:**
    - By default, `pd.concat()` concatenates along the rows (`axis=0`). You can change this behavior to concatenate along columns by setting `axis=1`.
    ```python
    # Concatenating along columns
    result = pd.concat([df1, df2], axis=1)
    ```

#### **Concatenation Examples**
- **Concatenating Series:**
    - You can also concatenate Series in a similar way to DataFrames, either along rows or columns.
    ```python
    s1 = pd.Series([0, 1, 2, 3], name="s1")
    s2 = pd.Series([4, 5, 6, 7], name="s2")

    # Concatenating Series along rows
    result = pd.concat([s1, s2])

    # Concatenating Series along columns
    result = pd.concat([s1, s2], axis=1)
    ```

- **Concatenating DataFrames with Different Shapes:**
    - When concatenating DataFrames with different shapes, Pandas automatically fills in missing values with `NaN` to accommodate the difference in dimensions.
    ```python
    df1 = pd.DataFrame({
        "A": ["A0", "A1", "A2"],
        "B": ["B0", "B1", "B2"]
    })

    df2 = pd.DataFrame({
        "A": ["A3", "A4"],
        "C": ["C3", "C4"]
    })

    # Concatenating with different shapes
    result = pd.concat([df1, df2], sort=False)
    ```

#### **Merging Basics**
- **Understanding Different Types of Joins:**
    - Merging combines two DataFrames based on a common column or index. There are several types of joins that determine how data is merged:
        - **Inner Join:** Returns only the rows with matching values in both DataFrames.
        - **Outer Join:** Returns all rows from both DataFrames, filling in `NaN` for missing values.
        - **Left Join:** Returns all rows from the left DataFrame, and matching rows from the right DataFrame.
        - **Right Join:** Returns all rows from the right DataFrame, and matching rows from the left DataFrame.

    ```python
    df1 = pd.DataFrame({"key": ["A", "B", "C", "D"], "value1": [1, 2, 3, 4]})
    df2 = pd.DataFrame({"key": ["B", "D", "E", "F"], "value2": [5, 6, 7, 8]})
    ```

- **Using `pd.merge()` for Merging DataFrames:**
    - The `pd.merge()` function is used to merge two DataFrames on a key column or index. You can specify the type of join using the `how` parameter.
    ```python
    # Inner join on the "key" column
    result = pd.merge(df1, df2, on="key", how="inner")

    # Outer join on the "key" column
    result = pd.merge(df1, df2, on="key", how="outer")
    ```

#### **Merging Examples**
- **Merging on Common Columns:**
    - Merging is typically performed on columns that are common between the two DataFrames. This is often used to combine related data from different sources.
    ```python
    # Left join on the "key" column
    result = pd.merge(df1, df2, on="key", how="left")
    ```

- **Merging with Different Column Names:**
    - If the key columns have different names in the DataFrames, you can specify them using the `left_on` and `right_on` parameters.
    ```python
    df1 = pd.DataFrame({"left_key": ["A", "B", "C"], "value1": [1, 2, 3]})
    df2 = pd.DataFrame({"right_key": ["B", "C", "D"], "value2": [4, 5, 6]})

    # Merging on different column names
    result = pd.merge(df1, df2, left_on="left_key", right_on="right_key", how="inner")
    ```

#### **Join Basics**
- **Difference Between `merge()` and `join()`:**
    - While `merge()` is used to combine DataFrames on common columns or indices, `join()` is typically used to combine DataFrames on their index, though it can also be used with columns.
    ```python
    df1 = df1.set_index("left_key")
    df2 = df2.set_index("right_key")

    # Joining on index
    result = df1.join(df2, how="inner")
    ```

- **Using `DataFrame.join()` for Joining DataFrames:**
    - The `join()` method is a convenient way to combine DataFrames when the index is the key.
    ```python
    df1 = pd.DataFrame({"A": ["A0", "A1", "A2"]}, index=["K0", "K1", "K2"])
    df2 = pd.DataFrame({"B": ["B0", "B1", "B2"]}, index=["K0", "K2", "K3"])

    # Joining DataFrames on index
    result = df1.join(df2, how="outer")
    ```

#### **Join Examples**
- **Joining on Index:**
    - Joining on index is particularly useful when your DataFrames are aligned by their index labels.
    ```python
    # Inner join on index
    result = df1.join(df2, how="inner")
    ```

- **Joining Multiple DataFrames:**
    - You can join multiple DataFrames in a sequence, either by chaining `join()` calls or by using a loop.
    ```python
    df3 = pd.DataFrame({"C": ["C0", "C1", "C2"]}, index=["K0", "K1", "K2"])

    # Chaining joins
    result = df1.join(df2).join(df3)
    ```
