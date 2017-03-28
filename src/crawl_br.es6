// import * as cheerio from 'cheerio';
import cheerio from 'cheerio';
import fetch from 'node-fetch';

class BiznesRadarCrawler {
  constructor(pageUrl) {
    this.pageUrl = 'http://www.biznesradar.pl/gielda/akcje_gpw';
    this.companiesArray = [];
  }

  getCompanies() {
    const page = await this.fetchPage();

    console.log('PAGE: ', page);
  }

  async fetchPage() {
    let $ = null;

    return fetch(this.pageUrl)
    .then(res => cheerio.load(res))
  }
}

// this must return a promise
export default function crawl(pageUrl) {
  let newCrawler = new BiznesRadarCrawler(pageUrl);

  return newCrawler.getCompanies();
}