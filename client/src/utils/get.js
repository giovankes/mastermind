const axios = require('axios');
const lorum = require('./hallo.json');
async function fetch_data() {
  const data = await axios.post('http://localhost:5000/post-data', {
    lorum,
  });
}

fetch_data();
