import dotenv from  'dotenv'
dotenv.config()

const config={
  PORT:process.env.PORT,
  MONGODB_URL:process.env.MONGODB_URL,
  NODE_ENV:process.env.NODE_ENV,
  JWT_SECRET:process.env.JWT_SECRET
}
export default config