---
title: Do My Friends Care About Me?
permalink: /blog/2017/04/15/Do-My-Friends-Care-About-Me/
author: Naitian Zhou
description: Yes. Yes, they do. At least, 22% of them.
tags:
    - post
    - data
---
## A Brief Analysis of my Facebook Friends

This was a (not so) quick look at how I stacked up against my Facebook friends in a totally arbitrary measure.

I looked at the ratio of likes and reacts (henceforth to be referred to as a singular entity: "realikes") to a user's profile picture to that user's friend count. That is, what percentage of a user's friends realiked his or her profile picture?

### Gathering Data

*I'll post a more detailed write-up of the technical aspects of scraping the Facebook profiles, as well as an iPython Notebook with the code.*

The most challenging (and time consuming) part was gathering the data. I ran into several dead ends before finally scraping the data from Facebook using Selenium. I'll go through all of the failed methods and my succeessful method here.

I had already collected a list of Facebook profile URLs just using Chrome Dev Tools on the client side.

My first idea was to use the Facebook Graph API. However, that quickly proved to be impossible, mainly because [this StackOverflow answer](http://stackoverflow.com/a/39649908) said so.

So on to the second solution! I figured I could use the python `requests` and `beautifulsoup` libraries to crawl Facebook, and just pass in my Facebook cookies for auth. While the authentication totally worked (exciting!), I discovered that Facebook does basically all of the rendering client side, so the HTML that I received was just a bunch of links to async scripts.

Ultimately, I resorted to Selenium to scraping first the links to profile pictures, and later, the actual realike counts.

### Examining the Data

After a little bit of cleaning up in Excel, I was ready to take a deeper look at the data.


```python
# Import our beloved libraries

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
```


```python
# Read in the data

data = pd.read_csv('./data.csv')
```


```python
# View the first 5 entries

data[:5]
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th># Likes on Pic</th>
      <th># Friends</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>77.0</td>
      <td>321.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>137.0</td>
      <td>527.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>176.0</td>
      <td>563.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>54.0</td>
      <td>898.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>103.0</td>
      <td>283.0</td>
    </tr>
  </tbody>
</table>
</div>




```python
# This includes "bad" rows, which don't have values for either or both of the columns
len(data)
```




    320




```python
# Drop the bad stuff
data = data.dropna()
```


```python
len(data)
```




    278




```python
plt.plot(data['# Friends'], data['# Likes on Pic'], 'bo')
plt.title('Realikes to Friend Count')
plt.ylabel('Realikes')
plt.xlabel('# Friends')
```




    <matplotlib.text.Text at 0x115283f28>




<figure>
<img src="/assets/img/output_7_1" alt=""/>
</figure>


There seems to be a general upwards trend, with users with more friends receiving a greater amount of likes from friends. This makes sense, since their pictures go out to a larger audience. I am more interested in the ratio between the realike count and friend count.

### Looking at the Realike Ratios


```python
# Insert new column of the ratios.
data['Ratio'] = data['# Likes on Pic'] / data['# Friends']
```


```python
# First look at the ratios! Just a brief summary.
data['Ratio'].describe()
```




    count    278.000000
    mean       0.158833
    std        0.093243
    min        0.000000
    25%        0.083202
    50%        0.159469
    75%        0.220952
    max        0.492114
    Name: Ratio, dtype: float64



Ok, so this summary provides some interesting information.

Just from clicking around Facebook earlier, I had thought that the average ratio would be somewhere between 20% and 30%, but it ended up being much lower, at 15.9%. 

Also interesting to note is that no one had over half of their friends like their profile picture, although the max of 49.2% came pretty close.


```python
# Sort data by friend count
data = data.sort_values(by='# Friends')
```


```python
%matplotlib inline

plt.plot(data['# Friends'], data.Ratio, 'bo')
plt.xlabel('# Friends')
plt.ylabel('Ratio')
plt.title('# Friends vs Realike Ratio')
```




    <matplotlib.text.Text at 0x113fc76a0>




<img src="/assets/img/output_14_1.png" alt=""/>


One of the biggest things I was hoping to see was a correlation between friend size and ratio. However, that did not really manifest itself. As you can see, the points are relatively evenly distributed.


```python
# Top 5 realike ratios.
data.sort_values(by='Ratio', ascending=False)[:5]
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th># Likes on Pic</th>
      <th># Friends</th>
      <th>Ratio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>8</th>
      <td>156.0</td>
      <td>317.0</td>
      <td>0.492114</td>
    </tr>
    <tr>
      <th>11</th>
      <td>155.0</td>
      <td>376.0</td>
      <td>0.412234</td>
    </tr>
    <tr>
      <th>158</th>
      <td>280.0</td>
      <td>742.0</td>
      <td>0.377358</td>
    </tr>
    <tr>
      <th>4</th>
      <td>103.0</td>
      <td>283.0</td>
      <td>0.363958</td>
    </tr>
    <tr>
      <th>12</th>
      <td>406.0</td>
      <td>1118.0</td>
      <td>0.363148</td>
    </tr>
  </tbody>
</table>
</div>




```python
# Bottom 5 realike ratios.
data.sort_values(by='Ratio', ascending=True)[:5]
```




<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th># Likes on Pic</th>
      <th># Friends</th>
      <th>Ratio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>92</th>
      <td>0.0</td>
      <td>125.0</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>40</th>
      <td>0.0</td>
      <td>117.0</td>
      <td>0.000000</td>
    </tr>
    <tr>
      <th>299</th>
      <td>1.0</td>
      <td>370.0</td>
      <td>0.002703</td>
    </tr>
    <tr>
      <th>57</th>
      <td>2.0</td>
      <td>539.0</td>
      <td>0.003711</td>
    </tr>
    <tr>
      <th>89</th>
      <td>6.0</td>
      <td>826.0</td>
      <td>0.007264</td>
    </tr>
  </tbody>
</table>
</div>



Viewing the lowest 5 realike ratios reveals that those with the lowest friend counts do *not* have the lowest realike ratios.

#### Does Friend Count Matter?

I then took a look at the distributions for users with more than 1000 friends compared to users with fewer than 1000 friends.

It's important to note that there are significantly more users with fewer than 1000 friends in my data set.


```python
gt1000 = data.loc[data['# Friends'] >= 1000]
lt1000 = data.loc[data['# Friends'] < 1000]
```


```python
len(gt1000)
```




    44




```python
gt1000['Ratio'].describe()
```




    count    44.000000
    mean      0.173164
    std       0.084129
    min       0.008739
    25%       0.116832
    50%       0.180046
    75%       0.219244
    max       0.363148
    Name: Ratio, dtype: float64




```python
lt1000['Ratio'].describe()
```




    count    234.000000
    mean       0.156139
    std        0.094783
    min        0.000000
    25%        0.072971
    50%        0.155958
    75%        0.220952
    max        0.492114
    Name: Ratio, dtype: float64



The mean ratio for those with > 1000 friends is a little bit larger than those without, as is the median.


```python
%matplotlib inline

plt.figure(figsize=(12, 4))

plt.subplot(121)
plt.plot(lt1000['# Friends'], lt1000['Ratio'], 'ro')
plt.plot(gt1000['# Friends'] - 1000, gt1000['Ratio'], 'bo')

plt.xlabel('# Friends')
plt.ylabel('Realike Ratio')
```




    <matplotlib.text.Text at 0x1140b42e8>




<img src="/assets/img/output_25_1.png" alt=""/>


This plot might be a little bit confusing. The red dots represents users with fewer than 1000 friends. The blue dots represents users with 1000 or more friends, but the dots are scaled so as to align with the red dots (by subtracting 1000 from the friend count). 

What does this reveal? Not much. There are more red dots in the upper right corner than blue dots, but the points are spread evenly enough where this is insignificant.

### Looking at Friend Counts

As an aside, I took a look at the distribution of friend counts.


```python
data['# Friends'].describe()
```




    count     278.000000
    mean      656.589928
    std       395.612176
    min        22.000000
    25%       371.750000
    50%       564.500000
    75%       841.750000
    max      2403.000000
    Name: # Friends, dtype: float64



Conclusion? My friends, on average, have twice as many friends as I do. Sad.


```python
plt.figure(figsize=(16, 8))

plt.subplot(121)
plt.boxplot(data['# Friends'])
plt.ylabel('# Friends')

plt.subplot(122)
plt.hist(data['# Friends'], bins=20)
plt.ylabel('Freq.')
plt.xlabel('# Friends')
plt.title('How Many Friends My Friends Have')

```




    <matplotlib.text.Text at 0x114f552b0>

<figure class="fullwidth">
<img src="/assets/img/output_30_1.png" alt="Graph of friend count distributions."/>
<figcaption>Distribution of my friends' friend counts</figcaption>
</figure>


As shown by the box plot and, perhaps more obviously, by the histogram, the distribution of friend counts is skewed right, accounting for the large difference between mean friend count and median friend count. Either way, I look to be pretty anti-social.

### Conclusions?

I can't really draw any statistically significant conclusions from these data. That said, there were some trends that were insightful or interesting to some extent.

#### Quality over Quantity

It's apparent that having a higher friend count does not necessarily result in a higher realike ratio. For 4 of the top 5 ranked realike users, the friend count was below the third quartile. In fact, the user with the highest friend count (2403 friends) had one of the lowest ratios (.8%)

That said, by examining the bottom 5, almost all were below the median friend count. This seems to imply that having too few friends is also not ideal. 

Given these very broad generalizations, one can make the logical ssumption that there is a "Goldilocks zone" of friend count that yields that highest ratio. However, the data is probably much to scattered to be able to actually generate a useful model.

#### An Individualized Analysis

This data set was composed of only my friends. This meant the data set was tailored uniquely to my choice of friends, which are mostly high schoolers in the NOVA area. 

#### Next Steps

There are quite a few paths in which I can proceed with this little experiment, if I want to. For one thing, it would be great to acquire more data, and, now that I think of it, generally profile pictures and friend counts are public, so I could expand the data set to beyond my friends.

Looking at the contents of the profile picture would also be interesting. For example, in pictures that were especially popular, were there multiple people? What is the gender / age / etc of the subject? However, this will be a much more nontrivial task.


