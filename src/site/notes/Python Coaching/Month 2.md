---
{"dg-publish":true,"permalink":"/python-coaching/month-2/"}
---

## Month 2: Introduction to Data Manipulation with Pandas

#### Week 1: Introduction to Pandas and Data Frames

- **Class 1:** What is Pandas? Introduction to Data Frames and Series
- **Class 2:** Creating and Inspecting Data Frames
- **Class 3:** Basic Data Frame Operations (Filtering and Sorting)

#### Week 2: Data Cleaning and Preprocessing

- **Class 1:** Handling Missing Data (dropna, fillna)
- **Class 2:** Simple Data Transformations (renaming columns, changing data types)
- **Class 3:** Data Normalization and Basic Scaling

#### Week 3: Data Merging and Joining

- **Class 1:** Concatenating Data Frames
- **Class 2:** Merging Data Frames (inner, outer joins)
- **Class 3:** Combining Data Frames with Join

#### Week 4: Data Grouping and Aggregation

- **Class 1:** Grouping Data and Basic Aggregation
- **Class 2:** Advanced Grouping (multiple keys)
- **Class 3:** Applying Functions to Groups



### Month 2: Data Manipulation with Pandas and NumPy

#### Week 1: Introduction to Pandas and Data Frames

**Class 1: What is Pandas? Introduction to Data Frames and Series**

- **Introduction to Pandas:**
    - Overview of Pandas and its importance in data analysis.
    - Installation and basic setup.
- **Data Frames and Series:**
    - Understanding Data Frames and Series.
    - Creating Series and Data Frames.
    - Basic operations on Series and Data Frames (e.g., accessing elements, slicing).

**Class 2: Creating and Inspecting Data Frames**

- **Creating Data Frames:**
    - Creating Data Frames from dictionaries.
    - Creating Data Frames from lists of lists.
    - Reading data from CSV files into Data Frames.
- **Inspecting Data Frames:**
    - Using `head()`, `tail()`, and `info()` methods.
    - Understanding data types with `dtypes`.
    - Summary statistics with `describe()`.

**Class 3: Basic Data Frame Operations (Filtering and Sorting)**

- **Filtering Data:**
    - Conditional filtering using boolean indexing.
    - Filtering with multiple conditions.
- **Sorting Data:**
    - Sorting Data Frames by columns using `sort_values()`.
    - Sorting by index using `sort_index()`.

#### Week 2: Data Cleaning and Preprocessing

**Class 1: Handling Missing Data (dropna, fillna)**

- **Identifying Missing Data:**
    - Checking for missing values using `isnull()` and `notnull()`.
- **Handling Missing Data:**
    - Removing missing data with `dropna()`.
    - Filling missing data with `fillna()`.
    - Using interpolation for missing data.

**Class 2: Simple Data Transformations (renaming columns, changing data types)**

- **Renaming Columns:**
    - Renaming columns with `rename()` and `columns` attribute.
- **Changing Data Types:**
    - Converting data types with `astype()`.
    - Using `pd.to_numeric()` and `pd.to_datetime()` for conversions.

**Class 3: Data Normalization and Basic Scaling**

- **Normalization Techniques:**
    - Min-Max scaling.
    - Standardization (Z-score scaling).
- **Applying Normalization:**
    - Using Pandas to normalize data.
    - Implementing basic scaling with `apply()` and `transform()`.

#### Week 3: Data Merging and Joining

**Class 1: Concatenating Data Frames**

- **Concatenation Basics:**
    - Using `pd.concat()` to concatenate Data Frames.
    - Concatenating along rows and columns.
- **Concatenation Examples:**
    - Concatenating Series.
    - Concatenating Data Frames with different shapes.

**Class 2: Merging Data Frames (inner, outer joins)**

- **Merging Basics:**
    - Understanding different types of joins: inner, outer, left, right.
    - Using `pd.merge()` for merging Data Frames.
- **Merging Examples:**
    - Merging on common columns.
    - Merging with different column names.

**Class 3: Combining Data Frames with Join**

- **Join Basics:**
    - Difference between `merge()` and `join()`.
    - Using `DataFrame.join()` for joining Data Frames.
- **Join Examples:**
    - Joining on index.
    - Joining multiple Data Frames.

#### Week 4: Data Grouping and Aggregation

**Class 1: Grouping Data and Basic Aggregation**

- **Grouping Basics:**
    - Grouping data with `groupby()`.
    - Aggregating data with common functions (`mean()`, `sum()`, `count()`).
- **Basic Aggregation Examples:**
    - Grouping by a single column.
    - Grouping by multiple columns.

**Class 2: Advanced Grouping (multiple keys)**

- **Advanced Grouping Techniques:**
    - Grouping with multiple keys.
    - Using `agg()` for applying multiple aggregation functions.
- **Advanced Grouping Examples:**
    - Custom aggregation functions.
    - Applying different functions to different columns.

**Class 3: Applying Functions to Groups**

- **Applying Functions:**
    - Using `apply()` with groupby objects.
    - Using `transform()` for group-wise operations.
- **Examples:**
    - Applying custom functions to groups.
    - Using `filter()` to filter groups based on a condition.



## Week 2
### Class 1: Handling Duplicates

In this class, we’ll focus on identifying and removing duplicate data from a DataFrame, which is essential for maintaining data integrity and ensuring accurate analysis.

#### **Identifying Duplicates:**

You can use the `duplicated()` method in Pandas to identify duplicate rows in a DataFrame. This method returns a Series of Boolean values indicating whether a row is a duplicate.

- **Syntax:**
  ```python
  df.duplicated()
  ```

- **Example:**
  ```python
  import pandas as pd
  
  data = {
      'Name': ['Alice', 'Bob', 'Alice', 'David'],
      'Age': [24, 27, 24, 32]
  }
  
  df = pd.DataFrame(data)
  print(df.duplicated())
  ```
  This will output:
  ```
  0    False
  1    False
  2     True
  3    False
  dtype: bool
  ```

  The output shows `True` for the duplicate row(s).

#### **Removing Duplicates:**

To remove duplicates, you can use the `drop_duplicates()` method. By default, it removes duplicate rows, keeping the first occurrence.

- **Syntax:**
  ```python
  df.drop_duplicates()
  ```

- **Example:**
  ```python
  df_cleaned = df.drop_duplicates()
  print(df_cleaned)
  ```
  This will output:
  ```
     Name  Age
  0  Alice   24
  1    Bob   27
  3  David   32
  ```

  The duplicate row has been removed.

#### **Specifying Columns for Duplicate Check:**

You can specify certain columns to check for duplicates, rather than checking the entire row.

- **Syntax:**
  ```python
  df.duplicated(subset=['column1', 'column2'])
  ```

- **Example:**
  ```python
  data = {
      'Name': ['Alice', 'Bob', 'Alice', 'Alice'],
      'Age': [24, 27, 24, 28],
      'City': ['NY', 'LA', 'NY', 'SF']
  }
  
  df = pd.DataFrame(data)
  print(df.duplicated(subset=['Name', 'City']))
  ```
  This will output:
  ```
  0    False
  1    False
  2     True
  3    False
  dtype: bool
  ```

  Here, only rows where both `Name` and `City` are duplicates are marked as `True`.

- **Removing Duplicate Rows Based on Specific Columns:**
  ```python
  df_cleaned = df.drop_duplicates(subset=['Name', 'City'])
  print(df_cleaned)
  ```

  This will remove duplicate rows based on the specified columns.

#### **Keeping the Last Occurrence:**

You can keep the last occurrence of duplicates instead of the first by using the `keep` parameter.

- **Syntax:**
  ```python
  df.drop_duplicates(keep='last')
  ```

- **Example:**
  ```python
  df_cleaned_last = df.drop_duplicates(keep='last')
  print(df_cleaned_last)
  ```

  This will retain the last occurrence of any duplicates.

#### **Dropping Duplicates In-Place:**

To drop duplicates directly in the original DataFrame, you can use the `inplace=True` parameter.

- **Syntax:**
  ```python
  df.drop_duplicates(inplace=True)
  ```

- **Example:**
  ```python
  df.drop_duplicates(inplace=True)
  print(df)
  ```

  The original DataFrame `df` is now modified to remove duplicates.

---

### Class 2: Data Transformation

In this class, we’ll focus on transforming data within a DataFrame using various Pandas methods, such as `apply()`, `map()`, and `applymap()`. These are powerful tools for applying custom functions and performing operations on DataFrames.

#### **Using `apply()` for Data Transformation:**

The `apply()` method is used to apply a function along an axis of the DataFrame. It can be applied to either rows or columns.

- **Syntax:**
  ```python
  df['column'].apply(function)
  ```

- **Example:**
  ```python
  import pandas as pd
  
  data = {
      'Name': ['Alice', 'Bob', 'Charlie'],
      'Age': [24, 27, 22]
  }
  
  df = pd.DataFrame(data)
  
  # Define a custom function to add 5 years to the age
  def add_five(x):
      return x + 5
  
  df['Age'] = df['Age'].apply(add_five)
  print(df)
  ```
  This will output:
  ```
       Name  Age
  0   Alice   29
  1     Bob   32
  2  Charlie  27
  ```

  Here, the custom function `add_five()` adds 5 years to each value in the `Age` column.

#### **Using `map()` for Element-wise Transformation:**

The `map()` method is used for element-wise transformations on Series objects. It’s particularly useful for replacing values in a column.

- **Syntax:**
  ```python
  df['column'] = df['column'].map(mapping_dict)
  ```

- **Example:**
  ```python
  df['Name'] = df['Name'].map({'Alice': 'Alicia', 'Bob': 'Robert'})
  print(df)
  ```
  This will output:
  ```
       Name  Age
  0  Alicia   29
  1  Robert   32
  2  Charlie  27
  ```

  Here, the `map()` function is used to replace specific names based on a dictionary mapping.

#### **Using `applymap()` for Element-wise Operations on a DataFrame:**

The `applymap()` method is used to apply a function to each element of a DataFrame. This method is particularly useful when you need to transform every element in the DataFrame.

- **Syntax:**
  ```python
  df.applymap(function)
  ```

- **Example:**
  ```python
  # Define a function to add a suffix to all string elements
  def add_suffix(x):
      if isinstance(x, str):
          return x + '_suffix'
      return x
  
  df = df.applymap(add_suffix)
  print(df)
  ```
  This will output:
  ```
           Name      Age
  0  Alicia_suffix  29
  1  Robert_suffix  32
  2  Charlie_suffix 27
  ```

  Here, the `applymap()` function adds the suffix `_suffix` to all string elements in the DataFrame.

#### **String Operations with Pandas:**

Pandas provides a set of string handling methods that can be accessed using the `str` accessor.

- **Example: Converting to Lowercase**
  ```python
  df['Name'] = df['Name'].str.lower()
  print(df)
  ```
  This will output:
  ```
           Name  Age
  0  alicia_suffix  29
  1  robert_suffix  32
  2  charlie_suffix 27
  ```

  Here, the `str.lower()` method converts all strings in the `Name` column to lowercase.

- **Example: Replacing Substrings**
  ```python
  df['Name'] = df['Name'].str.replace('_suffix', '')
  print(df)
  ```
  This will output:
  ```
       Name  Age
  0  alicia   29
  1  robert   32
  2  charlie  27
  ```

  Here, the `str.replace()` method is used to remove the `_suffix` substring from all names.

---

### Class 3: Handling Duplicates and Data Manipulation

In this class, we’ll focus on identifying and handling duplicate data, as well as further exploring methods for data manipulation.

#### **Identifying Duplicates:**

Pandas allows you to identify duplicate rows within your DataFrame using the `duplicated()` method. This is useful for ensuring data quality by identifying and removing redundant data.

- **Syntax:**
  ```python
  df.duplicated(subset=None, keep='first')
  ```

  - `subset`: Columns to consider when identifying duplicates. If not specified, considers all columns.
  - `keep`: Determines which duplicates to mark as `True`.
    - `'first'`: Marks all duplicates except the first occurrence as `True`.
    - `'last'`: Marks all duplicates except the last occurrence as `True`.
    - `False`: Marks all duplicates as `True`.

- **Example:**
  ```python
  import pandas as pd
  
  data = {
      'Name': ['Alice', 'Bob', 'Charlie', 'Alice'],
      'Age': [24, 27, 22, 24]
  }
  
  df = pd.DataFrame(data)
  
  # Identify duplicates
  print(df.duplicated())
  ```
  This will output:
  ```
  0    False
  1    False
  2    False
  3     True
  dtype: bool
  ```

  Here, the `duplicated()` method identifies the duplicate row (row 3) where both the `Name` and `Age` match an earlier row.

#### **Removing Duplicates:**

Once duplicates are identified, they can be removed using the `drop_duplicates()` method.

- **Syntax:**
  ```python
  df.drop_duplicates(subset=None, keep='first', inplace=False)
  ```

- **Example:**
  ```python
  # Remove duplicates
  df_no_duplicates = df.drop_duplicates()
  print(df_no_duplicates)
  ```
  This will output:
  ```
       Name  Age
  0   Alice   24
  1     Bob   27
  2  Charlie   22
  ```

  Here, the `drop_duplicates()` method removes the duplicate row, leaving only unique rows.

#### **Manipulating Data with `assign()` and `pipe()`:**

Pandas provides the `assign()` method for creating new columns or modifying existing ones, and the `pipe()` method for making your code cleaner when applying multiple functions to a DataFrame.

##### **Creating or Modifying Columns with `assign()`:**

- **Syntax:**
  ```python
  df.assign(new_column=expression)
  ```

- **Example:**
  ```python
  # Add a new column 'Age Group' based on 'Age'
  df = df.assign(Age_Group=lambda x: ['Adult' if age >= 18 else 'Minor' for age in x['Age']])
  print(df)
  ```
  This will output:
  ```
       Name  Age Age_Group
  0   Alice   24     Adult
  1     Bob   27     Adult
  2  Charlie   22     Adult
  3   Alice   24     Adult
  ```

  Here, `assign()` is used to create a new column `Age_Group` that categorizes individuals based on their age.

##### **Applying Functions with `pipe()`:**

The `pipe()` method is useful for chaining multiple operations in a readable way.

- **Syntax:**
  ```python
  df.pipe(func, *args, **kwargs)
  ```

- **Example:**
  ```python
  # Define a function to add 10 to 'Age'
  def add_ten(df):
      df['Age'] += 10
      return df
  
  # Use pipe to apply the function
  df = df.pipe(add_ten)
  print(df)
  ```
  This will output:
  ```
       Name  Age Age_Group
  0   Alice   34     Adult
  1     Bob   37     Adult
  2  Charlie   32     Adult
  3   Alice   34     Adult
  ```

  Here, `pipe()` is used to apply the `add_ten()` function to the DataFrame, increasing the age of each individual by 10.

---
