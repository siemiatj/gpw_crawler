import Console from 'better-console';
import BRCrawl from '../dist/crawl_br';

BRCrawl()
.then((ret) => {
  Console.log('ARTICLE: ', ret);
})
.catch((error) => {
  Console.log('ERROR: ', error);
});