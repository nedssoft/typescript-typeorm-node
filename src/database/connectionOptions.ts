import * as dotenv from 'dotenv';
import config from '../config/database'
dotenv.config()

const env: string = process.env.NODE_ENV || 'development'
export default {
    ...config.common,
    ...config[env]
}


