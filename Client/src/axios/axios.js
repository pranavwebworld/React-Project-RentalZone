import axios from 'axios'
import { BASEURL } from '../constants/constants'
const instance =  axios.create({

    baseURL:BASEURL

})

export default instance