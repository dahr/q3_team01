DevOps & CNA Q3 Training Tests
==============================

This is a shell project to run basic API tests against the Q3 DevOps & CNA 
training project.

Getting Started
---------------

The sample service implementation in this project is written in Node.JS, but 
that is not a requirement, it's simply a sample.  Any programming language, 
platform, or packaging mechanism may be used for the project, as long as the 
REST services satisfy the tests in this package.

To run the sample code:

1. Install Node.JS

2. Install all dependencies with "npm install"

3. (Recommended) Install nodemon with "npm install -g nodemon"
You can then run "nodemon app.js" to run the sample code.

Running the Tests
-----------------

The tests are implemented with Soap UI.  In order to run the tests, first ensure there is a REST server running with implementations to satisfy the tests.

1. Install SoapUI (Via GUI, or ```{downloaded package, e.g.}/Downloads/SoapUI-x64-5.2.1.sh -q -varfile {full-path-to-this-project}/response.varfile```

2. Run the test suite: ```/usr/local/share/SoapUI-5.2.1/bin/testrunner.sh -PPORT=4000 ./Q3-Training-Tests-soapui-project.xml```
