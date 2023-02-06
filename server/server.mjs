import express from "express"
import http from "http"
import { ApolloServer } from "@apollo/server"
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'
import bodyParser from "body-parser"
import cors from 'cors'
import mongoose from 'mongoose'

import { typeDefs } from './schemas/index.js'
import { resolvers } from './resolvers/index.js'
import 'dotenv/config'

const app = express()
const httpServer = http.createServer(app)

// Connect to database
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hdv0jrt.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 4000
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

await server.start()


app.use(cors(), bodyParser.json(), expressMiddleware(server))

mongoose.set('strictQuery', false)
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  console.log('Connected to DB')
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
  console.log('Server listening on port: 4000')
})
