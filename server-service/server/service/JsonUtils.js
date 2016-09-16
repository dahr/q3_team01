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
        try {
            return JSON.parse(encodedString.replace(/&#34;/g, '\"'));
        } catch (e) {
            console.log('Error' + e);
        }
    }


};

module.exports = JsonUtils;