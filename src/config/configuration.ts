export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  mongoUri: process.env.MONGO_URI,
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT as string, 10) || 6379,
  rabbitmqUrl: process.env.RABBITMQ_URL,
  jwtSecret: process.env.JWT_SECRET,
  openAiApiKey: process.env.OPENAI_API_KEY,
});
