var ParseException =require('./ParseException');

var JsonUtils = {
    parseResponseBody: function (options, body) {
        var parsedResponse = {data: '', error: null};

        try {
            parsedResponse.data = JSON.parse(body);
        } catch (e) {
            parsedResponse.error = 'ERROR: ' + options.url + '\n' + e + ' - while parsing:\n' + body;
            console.log(parsedResponse.error);
        }

        return parsedResponse;
    },

    parseEncodedString: function (encodedString) {
        if(!encodedString){
            return [];
        }

        try {
            return JSON.parse(encodedString.replace(/&#34;/g, '\"'));
        } catch (e) {
            throw new ParseException('Error Decoding:' + encodedString + '\n' + e)
        }
    }


};

module.exports = JsonUtils;