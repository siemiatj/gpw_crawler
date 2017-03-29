// import * as cheerio from 'cheerio';
// import 'babel-polyfill';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

class BiznesRadarCrawler {
  constructor(pageUrl = 'http://www.biznesradar.pl/gielda/akcje_gpw') {
    this.pageUrl = pageUrl;
    this.companiesArray = [];
  }

  async getCompanies() {
    const page = await this.fetchPage();

    console.log('PAGE: ', page);
  }

  async fetchPage() {
    return fetch(this.pageUrl)
    .then(res => {
      // console.log('RES: ', res);
      const $ = cheerio.load(res);
      console.log('$: ', $.html());

      return $;
    });
  }
}

// this must return a promise
export default function crawl(pageUrl) {
  const newCrawler = new BiznesRadarCrawler(pageUrl);

  return newCrawler.getCompanies();
}
