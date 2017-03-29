import Bluebird from 'bluebird';
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
    const gpwQuery = await this.fetchPage(this.gpwPageUrl);
    const ncQuery = await this.fetchPage(this.ncPageUrl);

    return new Bluebird((resolve, reject) => {
      const gpwCompanies = [];
      const ncCompanies = [];

      if (gpwQuery.isFulfilled() && ncQuery.isFulfilled()) {
        this.parseTableRows(gpwQuery.$, gpwCompanies);
        this.parseTableRows(ncQuery.$, ncCompanies);

        this.companiesObject = {
          GPW: gpwCompanies,
          NC: ncCompanies
        };

        resolve(this.companiesObject);
      } else {
        reject(gpwQuery.$, ncQuery.$);
      }
    });
  }

  async fetchPage(url) {
    let isRejected = false;
    let isFulfilled = false;

    const result = await fetchCheerioObject(url)
    .then($ => {
      isFulfilled = true;

      return $;
    }, error => {
      isRejected = true;
      console.log('There was an error fetching the page: ', error);

      return error;
    });

    return {
      $: result,
      isFulfilled: function isResolved() { return isFulfilled; },
      isRejected: function isNotResolved() { return isRejected; }
    };
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

export default function crawl() {
  const newCrawler = new BiznesRadarCrawler();

  return newCrawler.getCompanies();
}
