<p align="center"><img width="80" src="./images/logo.png"></p>

# Unit Price Helper

![GitHub Contributor](https://img.shields.io/github/contributors/yzhu27/UnitPriceHelper)
![license](https://img.shields.io/github/license/yzhu27/unitpricehelper)
![language](https://img.shields.io/github/languages/top/yzhu27/unitpricehelper)
[![DeepScan grade](https://deepscan.io/api/teams/19191/projects/22531/branches/667106/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=19191&pid=22531&bid=667106)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.7151932.svg)](https://doi.org/10.5281/zenodo.7151932)
![GitHub Build](https://img.shields.io/github/workflow/status/yzhu27/UnitPriceHelper/run%20unit%20tests)
## 
Unit Price Helper is an Google Chrome extension that allows to display the prices per unit for the products on multiple shopping sites, including Harris Teeter, Costco and Target.

Online shopping sites give us more choices of products, but to some extent, online shopping also increases the difficulty of selection. Most people tend to buy cheaper products, but which are cheaper? $18.38 for 48 Fl Oz or $27.49 for 101 Fl Oz? It's difficult to calculate each products' unit price manually. UnitPriceHelper is a solution to unit price comparation. It calculates the unit prices of products automatically and attach unit price tags to the product listing pages and product description pages, thus helping customers figure out each item's unit price.

## Introduction Video
[![project introduction](https://res.cloudinary.com/marcomontalbano/image/upload/v1665197301/video_to_markdown/images/youtube--dJazeKcEK_A-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/dJazeKcEK_A "project introduction")

## Features
- Display unit price tags on listing pages.
<p align="center"><img width="700" src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/feature_1.png"></p>

- Display unit price tags on product description pages.
<p align="center"><img width="700" src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/feature_3.png"></p>


## Prerequisites

## Supported Websites

- <a href="https://www.harristeeter.com/"><img src="https://searchlogovector.com/wp-content/uploads/2018/06/harris-teeter-logo-vector.png" width="200" /></a>

- <a href="https://www.costco.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Costco_Wholesale_logo_2010-10-26.svg/512px-Costco_Wholesale_logo_2010-10-26.svg.png" width="200" /></a>

- <a href="https://www.target.com/"><img src="https://chapelboromedia.s3.amazonaws.com/uploads/2018/11/14112305/TGT-logo.png" width="200" /></a>

More will be supported in the future...

## Installation

### Install from Google Chrome Extension Web Store

### Install from GreasyFork

- Please make sure you already installed [tampermonkey](http://tampermonkey.net/) or [greasemonkey](http://www.greasespot.net/) to your browser
- Install Unit Price Helper from [greasyfork](https://greasyfork.org/zh-CN/scripts/452600-unitpricehelper)

### Manually install
- Git clone this repository.
```
git clone https://github.com/yzhu27/UnitPriceHelper.git
```
- Open Google Chrome browser, click upper right three-dot "More" button $\rightarrow$ "More Tools" $\rightarrow$ "Extensions".
<p align="center"><img width="700" src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/install_1.png"></p>

- Turn on "Developer mode", then choose "Load unpacked".
<p align="center"><img width="700" src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/install_2.png"></p>

- Select <mark>**extension**<mark> folder in the UnitPriceHelper folder
  <p float="left">
  <img src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/install_3.png" width="450" /><img src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/install_4.png" width="450" /> 
  </p>
- Start your online shopping!

<br />
  
> **Note**
> 1) Make sure you allow the extension to read and change this page.
> <p align="center"><img width="450" src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/install_5.png"></p>
> 2) If the unit price tags doesn't appear, try to refresh your page.

## Languages

- JavaScript
- HTML

## Style Checker and Code Fomatter

- IDE and Style Checker: [VSCode](https://code.visualstudio.com/)

- Code Style Formatter: [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)

- Code Syntax Checker : [Eslint](https://https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Vscode plugin.

## Test and Coverage
| Statements                  | Branches                | Functions                 | Lines             |
| --------------------------- | ----------------------- | ------------------------- | ----------------- |
| ![Statements](https://img.shields.io/badge/statements-94.89%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-81.66%25-yellow.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-88.88%25-yellow.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-94.81%25-brightgreen.svg?style=flat) |
### Unit Test
  
  - [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).
    
  - Setup
  
    From the repository root, run:
    ```
    npm install
    npm run test:unit
    ```
### Code Coverage
  
  - [Istanbul](https://istanbul.js.org/)

## Automated Analysis Tool

- [DeepScan](https://deepscan.io/dashboard#view=project&tid=19191&pid=22531&bid=667106)

<img width="1427" alt="deepScan" src="https://raw.githubusercontent.com/yzhu27/UnitPriceHelper/main/images/deepscan.png">

## Contributors
**SE22 Group 7**
- Pinxiang Wang
- Jiayuan Huang
- Yuheng Zhu
- Mengzhe Wang
- Yiran Zhu
