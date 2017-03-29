[![Dependencies](https://david-dm.org/siemiatj/gpw_crawler.svg)](https://david-dm.org/siemiatj/gpw_crawler)
[![devDependencies](https://david-dm.org/siemiatj/gpw_crawler/dev-status.svg)](https://david-dm.org/siemiatj/gpw_crawler#info=devDependencies&view=table)
[![NPM version](https://badge.fury.io/js/gpw_crawler.svg)](https://badge.fury.io/js/gpw_crawler.svg)

## What

This is a simple crawler for getting a list of companies listed at Warsaw Stock Exchange (GPW) and NewConnect. It uses Cheerio to scrap data from [Biznes Radar](http://biznesradar.pl) page.

## Installation

Install the module using `npm`:

```
npm install gpw_crawler --save
```

or

```
npm install gpw_crawler -g
```

to install it globally and use it in the terminal.

## Usage

Simply import the library and call the function. It will return an object with two keys:
* GPW, for WSE stocks
* NC, for NewConnect stocks

ordered by name. Each entry in respective stocks arrays has two keys:
* index, stock short symbol
* name, stock name

```
{ GPW: 
   [ { index: '06N', name: '06MAGNA' },
     { index: '08N', name: '08OCTAVA' },
     { index: '11B', name: '11BIT' },
     ...
    ],
  NC:
   [ { index: '01C', name: '01CYBATON' },
     { index: '2CP', name: '2CPARTNER' },
     { index: '2IT', name: '2INTELLECT' },
    ...
   ]
}
```

Check the `example` folder or use this code as a starting point :

```
import GPWcrawl from 'gpw_crawler';

GPWcrawl()
.then(array => Console.log('COMPANIES: ', array))
.catch((gpwError, ncError) => Console.log('ERROR: ', gpwError, ncError));
```

## Terminal

```
$ gpw_crawler
```

As a result you will receive the same array as above.

## Development

To build the project from the source run:

```bash
npm install && gulp
```

## Testing

No tests yet :()