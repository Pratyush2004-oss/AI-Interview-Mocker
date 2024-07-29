import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgresql://neondb_owner:JjXVaRv26PKB@ep-jolly-bread-a5hdf74l.us-east-2.aws.neon.tech/AI-Interview-Mocker?sslmode=require",
  },
  verbose: true,
  strict: true,
})