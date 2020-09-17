const axios = require('axios');

async function getDataFromRest(input) {

    const personResponse = await axios.get(`http://localhost:4000/person/${input}`);
    const {val1, val2} = personResponse.data;

    const facilityResponse = await axios.get(`http://localhost:4000/facility/${val1}`);
    const {val3, val4} =facilityResponse.data;

    const exposureResponse = await axios.get(`http://localhost:4000/exposure/${val2}`);
    const {val5} = exposureResponse.data;
    
    return {val3, val5};
}

module.exports = {
    getDataFromRest
}
