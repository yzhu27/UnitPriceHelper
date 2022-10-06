<p align="center"><img width="80" src="./images/logo.png"></p>

# UnitPriceHelper

![GitHub Contributor](https://img.shields.io/github/contributors/yzhu27/UnitPriceHelper)
![GitHub Build](https://img.shields.io/github/workflow/status/yzhu27/UnitPriceHelper/run%20unit%20tests)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7151932.svg)](https://doi.org/10.5281/zenodo.7151932)
## 
UnitPriceHelper is an Google Chrome extension that allows to display the prices per unit for the products on multiple shopping sites, including Harris Teeter, Costco and Target.

Online shopping sites give us more choices of products, but to some extent, online shopping also increases the difficulty of selection. Most people tend to buy cheaper products, but which are cheaper? $18.38 for 48 Fl Oz or $27.49 for 101 Fl Oz? It's difficult to calculate each products' unit price manually. UnitPriceHelper is a solution to unit price comparation. It calculates the unit prices of products automatically and attach unit price tags to the product listing pages and product description pages, thus helping customers figure out each item's unit price.


[video]

## Features
- Display unit price tags on listing pages.
<p align="center"><img width="800" src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/feature_1.png"></p>

- Display unit price tags on product description pages.
<p align="center"><img width="800" src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/feature_3.png"></p>
## Prerequisites


## Installation
- Git clone this repository.
```
git clone https://github.com/yzhu27/UnitPriceHelper.git
```
- Open Google Chrome browser, click upper right three-dot "More" button $\rightarrow$ "More Tools" $\rightarrow$ "Extensions".
<p align="center"><img width="800" src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/install_1.png"></p>

- Turn on "Developer mode", then choose "Load unpacked".
<p align="center"><img width="800" src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/install_2.png"></p>

- Select <mark>**extension**<mark> folder in the UnitPriceHelper folder
  <p float="left">
  <img src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/install_3.png" width="400" /><img src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/install_4.png" width="400" /> 
  </p>
- Open https://www.harristeeter.com/ or https://www.costco.com/, search your favorite product!

> **Note**
> 1) Make sure you allow the extension to read and change this page.
> <p align="center"><img width="450" src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/install_5.png"></p>
> 2) If the unit price tags doesn't appear, try to refresh your page.

## Testing
```
npm install
npm run test:unit
```
## Contributors
**SE22 Group 7**
- Pinxiang Wang
- Jiayuan Huang
- Yuheng Zhu
- Mengzhe Wang
- Yiran Zhu
