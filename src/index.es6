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
    const gpwDOM = await this.fetchPage(this.gpwPageUrl);
    const ncDOM = await this.fetchPage(this.ncPageUrl);

    console.log('BLA: ', gpwDOM);

    return new Bluebird(function (resolve, reject) {
      const gpwCompanies = [];
      const ncCompanies = [];

      if (gpwDOM.isFulfilled() && ncDOM.isFulfilled()) {
        this.parseTableRows(gpwDOM, gpwCompanies);
        this.parseTableRows(ncDOM, ncCompanies);

        this.companiesObject = {
          GPW: gpwCompanies,
          NC: ncCompanies
        };

        resolve(this.companiesObject);
      } else {
        reject(gpwDOM.isRejected(), ncDOM.isRejected());
      }
      // request(options)
      //   .then($ => {
      //     parseTitle($, fetchedArticle);
      //     parseLinks($, fetchedArticle);
      //     parseSections($, fetchedArticle);

      //     resolve(fetchedArticle);
      //   })
      //   .catch(err => {
      //     reject(err);
      //   });
    });
  }

  async fetchPage(url) {
    // Set initial state
    let isPending = true;
    let isRejected = false;
    let isFulfilled = false;

    const result = fetchCheerioObject(url)
    .then($ => {
      isPending = false;
      isFulfilled = true;

      return $;
    }, error => {
      isPending = false;
      isRejected = error;
      console.log('There was an error fetching the page: ', error);
    });

    result.isFulfilled = function () { return isFulfilled; };
    result.isPending = function () { return isPending; };
    result.isRejected = function () { return isRejected; };

    return result;
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
