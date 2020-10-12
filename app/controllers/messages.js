const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const axios = require('axios');
const { Console } = require('winston/lib/winston/transports');

module.exports = {
    incoming: async (req, res) => {
        try {
            
            console.log({req: req.body})
            const body = req.body
            const option = {
                from: body.To,
                body: '',
                to: body.From
            }
            const messages = body.Body.split(' ')
            const baseUrl = process.env.COVID_API_BASE
            console.log({messages, baseUrl})
            const dataCountry = await axios.get(baseUrl+'/covid/summary/'+messages[1])
            console.log(dataCountry.data)
            switch (messages[0]) {
                case 'CASES':
                    option.body = `${messages[1]} Active Cases ${dataCountry.data.data.summary.active.toLocaleString()}`
                    break;
                case 'DEATHS':
                    option.body = `${messages[1]} Deaths ${dataCountry.data.data.summary.death.toLocaleString()}`
                    break;
                default:
                    option.body = 'Format available are [CASES|DEATHS] <space> [COUNTRY CODE|TOTAL]'
                    break;
            }
            console.log({option})
            const send = await client.messages.create(option)
            console.log({send})
    
            return
        } catch (err) {
            console.log(err)
        }
    }
}
