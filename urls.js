/* INSTALLATIONS

npm i got cheerio
npm i url-status-code 

*/

const got = require('got');
const cheerio = require('cheerio');

const extractLinks = async (url) => {
  try {
    // Fetching HTML
    const response = await got(url);
    const html = response.body;

    // Using cheerio to extract <a> tags
    const $ = cheerio.load(html);

    const linkObjects = $('a');

    // Collect the "href" and "title" of each link and add them to an array
    const links = [];
    linkObjects.each((index, element) => {
      links.push({
        link: $(element).attr('href'), // get the href attribute
        status: ''
      }
      );
    });
    for (let i = 0; i < links.length; i++) {    
      if (!links[i].link.includes('http') && !links[i].link.includes('www')) {
        links[i].link = ''
      } 
      if (links[i].link) {
        (async () => {
          let urlStatusCode = require('url-status-code')
          let url = links[i].link
          try {
            let status = await urlStatusCode(url)
            links[i].status = status;
            console.log(links[i])
          } catch (error) {
            console.error(error)
          }
        })() 
      }
        
    }
  } catch (error) {
    console.log(error.response.body);
  }
};
const URL = 'http://murata.com/';
extractLinks(URL);