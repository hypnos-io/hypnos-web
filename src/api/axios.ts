import axios from 'axios'
import {VITE_API_URL} from '../constants'

export const api = axios.create({
  baseURL: VITE_API_URL,
})