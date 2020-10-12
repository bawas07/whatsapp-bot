const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {
    incoming: async (req, res) => {
        console.log({req: req.body})
        const body = req.body
        const option = {
            from: body.To,
            body: 'You said: '+body.Body,
            to: body.From
        }
        const send = await client.messages.create(option)
        console.log({send})

        return
    }
}
