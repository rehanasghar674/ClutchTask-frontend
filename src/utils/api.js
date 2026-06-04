import axios from 'axios'

const baseURL = 'https://clutch-task-backend.vercel.app/api'

export const api = axios.create({
  baseURL: baseURL,
  headers: { 'Content-Type': 'application/json' },
});