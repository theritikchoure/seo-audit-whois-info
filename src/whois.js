const axios = require('axios');
const { JSDOM } = require('jsdom');

const getWebsiteUrl = (url) => `https://www.whois.com/whois/${url}`

async function getWhois(url) {
    const websiteUrl = getWebsiteUrl(url);
    const { data } = await axios.get(websiteUrl);

    const dom = new JSDOM(data);
    const getElement = (selector) => dom.window.document.querySelector(selector).textContent;

    const heading = getElement('#page-wrapper div .whois_main_column div:nth-child(6) .df-heading')
    //#page-wrapper > div > div.whois_main_column > div:nth-child(6) > div.df-heading

    const whoisInfo = dom.window.document.querySelectorAll('.df-block .df-row');
    const domainInformations = [];
    let i = 0;
    try
    {
        whoisInfo.forEach((information) => {
            const label = information.querySelector('.df-label').textContent;
            const value = information.querySelector('.df-value').textContent.replace('comns', 'com ns').replace('comns', 'com ns').replace('comns', 'com ns').replace('comns', 'com ns').replace('Prohibitedclient', 'Prohibited client').replace('Prohibitedclient', 'Prohibited client').replace('Prohibitedserver', 'Prohibited server').replace('Prohibitedserver', 'Prohibited server').replace('Prohibitedserver', 'Prohibited server').replace('comroman', 'com roman');
    
            domainInformations.push({
                label,
                value
            });
            if(i>9)
            {
                throw new Exception("End");
            }
            i++;
        })
    }
    catch(e){
        // console.log('loop ended')
    }


    const rawWhoisData = getElement('.df-block-raw pre');

//----------------------------------------------------------------------------------------------------------------------------
    // RESULT
    // const whoisResult = {
    //     domainInformations,
    //     rawWhoisData
    // }
    
    // console.log(whoisResult);
    return { domainInformations, rawWhoisData};
}

module.exports = getWhois;