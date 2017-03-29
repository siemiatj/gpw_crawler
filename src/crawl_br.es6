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
  parseTableRows($) {
    const rows = $('.qTableFull').find('.soid');

    rows.map((idx, row) => {
      const { index, name } = this.parseCompanyText($(row).children().first().text());

      this.companiesArray.push({ index, name });
    });
  }
/* eslint-enable array-callback-return */
}

// this must return a promise
export default function crawl(pageUrl) {
  const newCrawler = new BiznesRadarCrawler(pageUrl);

  return newCrawler.getCompanies();
}
