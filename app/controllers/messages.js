const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const axios = require('axios');
const { Console } = require('winston/lib/winston/transports');
const covidService = require('../services/covidService')

module.exports = {
    incoming: async (req, res) => {
        try {
            const body = req.body
            const option = {
                from: body.To,
                body: 'type HELP to show command list',
                to: body.From
            }
            const messages = body.Body.toUpperCase().split(' ')
            if (messages[0] === 'COUNTRY') {
                option.body = await covidService.getListCountry(messages[1])
            }
            if (messages[0] === 'CASES' || messages[0] === 'DEATHS' || messages[0] === 'CURED') {
                option.body = await covidService.getSummary(messages)
            }
            if (messages[0] === 'HELP') {
                option.body = 'Type [CASES|DEATHS|CURED] <space> [COUNTRY CODE|TOTAL] to get covid data or [COUNTRY] <SPACE> <LETTER> to get list of available countries begin the letter'
            }
            console.log({option})
            const send = await client.messages.create(option)
            console.log({send})
    
            return res.json({status:'ok'})
        } catch (err) {
            console.log({err})
            return res.json({status:'error'})
        }
    }
}
