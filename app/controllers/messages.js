const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const axios = require('axios');
const { Console } = require('winston/lib/winston/transports');

module.exports = {
    incoming: async (req, res) => {
        try {
            
            const body = req.body
            const option = {
                from: body.To,
                body: '',
                to: body.From
            }
            const messageRaw = body.Body.split(' ')
            const messages = messageRaw.toUpperCase()
            const baseUrl = process.env.COVID_API_BASE
            const dataCountry = await axios.get(baseUrl+'/covid/summary/'+messages[1])
            if (dataCountry.data === null) {
                option.body = 'Cannot find country with code ' + messages[1] + '. Please use correct country code'
            }
            switch (messages[0]) {
                case 'CASES':
                    option.body = `${messages[1]} Active Cases ${dataCountry.data.data.summary.active.toLocaleString()}`
                    break;
                case 'DEATHS':
                    option.body = `${messages[1]} Deaths ${dataCountry.data.data.summary.death.toLocaleString()}`
                    break;
                case 'CURED':
                    option.body = `${messages[1]} Cured ${dataCountry.data.data.summary.recovered.toLocaleString()}`
                    break;
                default:
                    option.body = 'Format available are [CASES|DEATHS|CURED] <space> [COUNTRY CODE|TOTAL]'
                    break;
            }
            const send = await client.messages.create(option)
            console.log({send})
    
            return
        } catch (err) {
            console.log({err})
        }
    }
}
