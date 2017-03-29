import fetchCheerioObject from 'fetch-cheerio-object';

class BiznesRadarCrawler {
  constructor() {
    this.gpwPageUrl = 'http://www.biznesradar.pl/gielda/akcje_gpw';
    this.ncPageUrl = 'http://www.biznesradar.pl/gielda/newconnect';
    this.companiesObject = {
      GPW: null,
      NC: null
    };
  }

  async getCompanies() {
    const gpwDOM = await this.fetchPage(this.gpwPageUrl);
    const ncDOM = await this.fetchPage(this.ncPageUrl);
    const gpwCompanies = [];
    const ncCompanies = [];

    this.parseTableRows(gpwDOM, gpwCompanies);
    this.parseTableRows(ncDOM, ncCompanies);

    this.companiesObject = {
      GPW: gpwCompanies,
      NC: ncCompanies
    };

    return this.companiesObject;
  }

  async fetchPage(url) {
    return fetchCheerioObject(url)
    .then($ => $, error => console.log('There was an error fetching the page: ', error));
  }

  parseCompanyText(text) {
    const split = text.split(' ');
    const index = split[0];
    let name = '';

    if (split[1]) {
      name = split[1].replace(/[()]/g, '');
    }

    return { index, name };
  }

/* eslint-disable array-callback-return */
  parseTableRows($, table) {
    const rows = $('.qTableFull').find('.soid');

    rows.map((idx, row) => {
      const { index, name } = this.parseCompanyText($(row).children().first().text());

      table.push({ index, name });
    });
  }
/* eslint-enable array-callback-return */
}

// this must return a promise
export default function crawl(pageUrl) {
  const newCrawler = new BiznesRadarCrawler(pageUrl);

  return newCrawler.getCompanies();
}
