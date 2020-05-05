import axios from 'axios'

const headers = {
  'Content-Type': 'application/json'
}

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: headers
});


export async function getCities() {
  try {
    const {status, data } = await axiosInstance.get('/cities/')
    if (status === 200) {
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getCovData(city) {
  try {
    const { status, data } = city 
      ? await axiosInstance.get(`/measurements/${city}`) 
      : await axiosInstance.get('/measurements/') 
    if (status === 200) {
      return data
    }
  } catch (error) {
    console.log(error)
  }
}

export async function getMetaData() {
  try {
    const { status, data } = await axiosInstance.get('/metadata') 
    if (status === 200) {
      return data
    }
  } catch (error) {
    console.log(error)
  }
}