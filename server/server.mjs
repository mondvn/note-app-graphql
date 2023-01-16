import express from "express"
import http from "http"
import { ApolloServer } from "@apollo/server"
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware} from '@apollo/server/express4'
import bodyParser from "body-parser"
import cors from 'cors'

import fakeData from "./fakeData/index.js"

const app = express()
const httpServer = http.createServer(app)


/** Khi làm việc vs graphql cần nắm rõ 2 khái niệm:
 * Schema - doc tài liệu những dữ liệu sẽ bao gồm gì, có kiểu dữ liệu là gì
 * Có 3 kiểu type:
 * Query: hoạt động cho những truy vấn từ client
 * Mutation: muốn update xóa dữ liệu
 * Subscription muốn update theo dạng realtime
 */
const typeDefs = `#graphql
  type Folder {
    id: String,
    name: String,
    createdAt: String,
    author: Author
  }

  type Author {
    id: String,
    name: String

  }

  type Query {
    folders: [Folder]
  }
`
/** Resolver - Xử lý dữ liệu và trả dữ liệu về cho phía client dựa theo query mà client gửi lên
 * 
 */
const resolvers = {
  Query: {
    folders: () => {return fakeData.folders},
  },
  Folder: {
    author: () => {return {id: 1, name: 'Hello World'}}
  }
}


const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

await server.start()


app.use(cors(), bodyParser.json(), expressMiddleware(server))

await new Promise((resolve) => httpServer.listen({port: 4000}, resolve))
console.log('Server listening on port: 4000')