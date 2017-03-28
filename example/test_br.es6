import 'babel-polyfill';
import Console from 'better-console';
import BRCrawl from '../dist/crawl_br';

BRCrawl()
.then((array) => {
  Console.log('COMPANIES: ', array);
})
.catch((error) => {
  Console.log('ERROR: ', error);
});
