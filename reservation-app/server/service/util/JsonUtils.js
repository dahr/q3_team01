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
        try {
            return JSON.parse(encodedString.replace(/&#34;/g, '\"'));
        } catch (e) {
            throw new ParseException('Error Decoding:' + encodedString + '\n' + e)
        }
    },

    validDate: function (date) {
        //YYYYMMDD

        var re = /^(20)\d{2}(0[1-9]|1[1-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/;
        return re.test(date);
    }


};

module.exports = JsonUtils;