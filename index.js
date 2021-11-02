const express = require('express');
const bodyParser = require("body-parser");
const rTracer = require('cls-rtracer');
const axios = require('axios');
var cors = require('cors')

const logger = require('./logger');
global.rTracer = rTracer;
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: '50mb',
    extended: false
}));

app.use(bodyParser.json());
app.use(rTracer.expressMiddleware(
    {
        useHeader: true,
        headerName: 'auth_tracer_id'
    }
))

app.get('/ping', async(req,res) => {
    return res.send({'success' : 1})
})

app.post('/', async (req, res) => {
    logger.info('>>>>>>>>>>>>>> Execution Starts Here >>>>>>>>>>>>>>')
    logger.info(`Request headers: ${JSON.stringify(req.headers)}, body: ${JSON.stringify(req.body)}, query: ${JSON.stringify(req.query)}, URL: ${JSON.stringify(req.url)}, IP: ${req.ip}`);
    let start_time = Date.now()
    let result = await API_CALL(req.body.options);

    logger.info(`Response data: ${JSON.stringify(result)}`)
    logger.info(`Response time: ${Date.now() - start_time} MS`)
    logger.info('>>>>>>>>>>>>>> Execution Ends Here >>>>>>>>>>>>>>')
    return res.send(result)
})

const API_CALL = async (data) => {
    try {
        if(!data || typeof data != 'object' || Object.keys(data).length === 0) {
            return {success: 0, message: "Options is required!"}
        }

        if(!data.url || data.url.trim() == '') {
            return {success: 0, message: "Url is required!"}
        }

        if(!data.method || data.method.trim() == '') {
            return {success: 0, message: "Method is required!"}
        }
        
        let response = await axios(data);
        logger.info(`Response from axios | Status: ${response.status}`)
        return {success: 1, message: response.data}
    } catch (error) {
        console.log(error)
        return {success: 0, message: `Failed with error: ${error.toString()}`}
    }
}

app.listen(port, () => {
    logger.info(`Example app listening at http://127.0.0.1:${port}`);
})

