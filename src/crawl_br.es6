import fetchCheerioObject from 'fetch-cheerio-object';

class BiznesRadarCrawler {
  constructor(pageUrl = 'http://www.biznesradar.pl/gielda/akcje_gpw') {
    this.pageUrl = pageUrl;
    this.companiesArray = [];
  }

  async getCompanies() {
    const cheerioDOM = await this.fetchPage();

    this.parseTableRows(cheerioDOM);

    return this.companiesArray;
  }

  async fetchPage() {
    return fetchCheerioObject(this.pageUrl)
    .then($ => $, error => console.log('There was an error fetching the page: ', error));
  }

/* eslint-disable array-callback-return */
  parseTableRows($) {
    const rows = $('.qTableFull').children();
    rows.map((idx, row) => {
      console.log('ROW:  ', $(row).children('');
    });
  }
/* eslint-enable array-callback-return */
}

// this must return a promise
export default function crawl(pageUrl) {
  const newCrawler = new BiznesRadarCrawler(pageUrl);

  return newCrawler.getCompanies();
}
