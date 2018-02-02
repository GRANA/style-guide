<p align="center">
  <a href="https://grana.com">
    <img src="https://ci5.googleusercontent.com/proxy/Tnzq17baRFIbJf5GaewtP0PPIHqKlkud3xV8KspOZWp_yRSoevRG5PzOYlQBJs4NCoNJyCyi3S8k1GXyTQ_EM2M6_vRYU7qKcf0J5Uqs53N1T27A9n3fctBLeJHR-qGAd-yDam01o2SSEiaBK70cR3scQp37V3vX4j_1z0MeixM=s0-d-e1-ft#https://media.grana.com/static/version1500534080/frontend/Grana/desktop/en_US/Magento_Email/logo_email.png" width=200>
  </a>
  
  <h3 align="center">Mangolian</h3>

  <p align="center">
    A minimal design pattern library
  </p>
</p>

## Introduction

The repository contains the Grana Style Guide, a library of components and styles 
that serves as a foundation for grana.com. Provides documentation
on implementation for developers and designers with the goal of maintaining consistency.

## Features
- Typography classes for extending
- Default colours
- Custom UI components
- Grana font iconography

## Installation

### Bower

Including the style guide into your grana dev environment requires Bower for handling dependencies.

1. Install Bower using npm:

```bash
   npm install -g bower
   ```
2. In the root project dir, login using your github token:

```bash
   bower login -t {TOKEN}
   ```
3. Install dependencies:

```bash
   bower install
   ```

### Project

1. Import Style Guide into the projects main.scss file:

```scss
   @import "dialectics/core/dialectics";
   ```
2. Include js files in dialectics/core/dialectics/js

### Dependencies

- Jquery 1.11.1
- Sass 3.4.22 
- Bourbon 4.2.2
- Neat 2.0.0

## Sass

We follow modular methodology when writing our css. Please refer to our document on [SMACSS](https://granacom.atlassian.net/wiki/display/TD/Scalable+and+Modular+Architecture+for+CSS)

Sass formatting shall follow Thoughtbot's sass guide [here](https://github.com/thoughtbot/guides/tree/master/style/sass).

## Documentation

The documentation uses Jekyll static webpage builder hosted on Github pages. Viewing the doc locally requires installation of [npm](https://www.npmjs.com/get-npm), [Jekyll](https://jekyllrb.com/), and [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md). It is recommended that contributors develop the core style guide using the documentation pages.

### Local setup

1. Clone this repository into your directory:

```bash
   git clone git@github.com:GRANA/style.guide.git
   ```
   
2. While in the directory, run node package manager to install dependency modules:

 ```bash
   npm install
   ```
   
3.  Run gulp to build project:

```bash
   gulp jekyll
   ```
