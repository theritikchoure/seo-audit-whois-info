const express = require('express');
const getInfo = require('./src/scrap');
const getWhois = require('./src/whois');

const app = express();

app.get('/', (req, res) => {
    res.send('OK');
})

app.get('/:url', async (req, res) => {

    const audit = await getInfo(req.params.url);
    const { auditResult, metaSpecifications } = audit;

    const whois = await getWhois(req.params.url);
    // const { domainInformations, rawWhoisData } = whois;

    // console.log(metaSpecifications);
    res.status(200).json({
        auditResult,
        metaSpecifications,
        whois
    })
})

app.listen(3000);