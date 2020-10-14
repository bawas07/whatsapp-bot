const baseUrl = process.env.COVID_API_BASE
const axios = require('axios')
const { BulkCountryUpdateInstance } = require('twilio/lib/rest/voice/v1/dialingPermissions/bulkCountryUpdate')
module.exports = {
    getSummary: async (messages) => {
            const dataCountry = await axios.get(baseUrl+'/covid/summary/'+messages[1])
            if (dataCountry.data.data === null) {
                return 'Cannot find country with code ' + messages[1] + '. Please use correct country code'
            } else {
                switch (messages[0]) {
                    case 'CASES':
                        return `${messages[1]} Active Cases ${dataCountry.data.data.summary.active.toLocaleString()}`
                        // break;
                    case 'DEATHS':
                        return `${messages[1]} Deaths ${dataCountry.data.data.summary.death.toLocaleString()}`
                        // break;
                    case 'CURED':
                        return `${messages[1]} Cured ${dataCountry.data.data.summary.recovered.toLocaleString()}`
                        // break;
                    default:
                        return 'Format available are [CASES|DEATHS|CURED] <space> [COUNTRY CODE|TOTAL]'
                        // break;
                }    
            }
    },
    getListCountry: async (letter) => {
        const dataCountry = await axios.get(baseUrl+'/covid/countries/list?word='+letter[0])
        const countries = [];
        // console.log({res: dataCountry.data})
        for (let i=1, iLen=dataCountry.data.data.length;i < iLen; i++) {
            const country = dataCountry.data.data[i]
            console.log(country)
            const countryBody = 'Name: '+ country.name + ', Code: ' + country.code_country
            countries.push(countryBody)
        }
        if (countries.length < 1) {
            return 'Sorry, we cannot find any countries that begin with '+letter+' in our database'
        }
        console.log(countries.join('\n'))
        return countries.join('\n')
    }
}
