const axios = require('axios')
const functions = require('firebase-functions');

exports.getDataApi = async(url) => {
  try {
    const { status, data } = await axios.get(url, {
      params: {
        '$limit': '5000', 
        '$$app_token': functions.config().soda.token
      }
    })
    if (status === 200) {
      return data
    }
  } catch (error) {
    console.log(error)
  }
}