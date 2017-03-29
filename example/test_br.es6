import 'babel-polyfill';
import Console from 'better-console';
import GPWcrawl from '../dist';

GPWcrawl()
.then((array) => {
  Console.log('COMPANIES: ', array);
})
.catch((gpwError, ncError) => {
  Console.log('ERROR: ', gpwError, ncError);
});
