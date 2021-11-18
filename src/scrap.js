const axios = require('axios');
const { JSDOM } = require('jsdom');

const getWebsiteUrl = (url) => `https://freetools.seobility.net/en/seocheck/${url}`

async function getInfo(url) {
    const websiteUrl = getWebsiteUrl(url);
    const { data } = await axios.get(websiteUrl);

    const dom = new JSDOM(data);
    const getElement = (selector) => dom.window.document.querySelector(selector).textContent;

    const title = getElement('#accountback .contentbox h1').replace('SEO Checker', 'SEO Audit Report by Ritik');
    const response_time = getElement('#accountback .contentbox .quickfacts span');

    const todoList = dom.window.document.querySelectorAll('.hint');
    const recommendations = [];
    todoList.forEach((todo) => {
        const tip = todo.querySelector('.tip').textContent;
        recommendations.push({
            tip
        });
    })

    const metaSpecification = dom.window.document.querySelectorAll('.factoroverrow');
    const metaSpecifications = [];
    metaSpecification.forEach((specs) => {
        const specsTitle = specs.querySelector('.factorrow .factornamebox').textContent;
        const specsDesc = specs.querySelector('.factorrow .factormessagebox div').textContent;

        const metaDetails = { specsTitle, specsDesc} 
        metaSpecifications.push({
            metaDetails
        });
    })

    const robots_txt = getElement('#accountback .contentbox .col-md-4 pre');

//----------------------------------------------------------------------------------------------------------------------------
    // RESULT
    const auditResult = {
        title,
        response_time,
        recommendations,
        robots_txt
    }
    
    return { auditResult, metaSpecifications };
}

module.exports = getInfo;

