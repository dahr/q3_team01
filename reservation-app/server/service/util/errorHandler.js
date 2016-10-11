var errorHandler = {

    hasErrors: function (options, error, response) {

        if (error) {
            console.log('Error:', error);
            return error;
        } else if (response.statusCode !== 200) {
            //Check for right status code
            error = new Error("Unexpected status code: " + response.statusCode);
            error.res = response;
            console.log('Error:', error);
            return error;
        }

        return null;
    }

};

module.exports = errorHandler;
