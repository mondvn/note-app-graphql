/** Khi làm việc vs graphql cần nắm rõ 2 khái niệm:
 * Schema - doc tài liệu những dữ liệu sẽ bao gồm gì, có kiểu dữ liệu là gì
 * Có 3 kiểu type:
 * Query: hoạt động cho những truy vấn từ client
 * Mutation: muốn update xóa dữ liệu
 * Subscription muốn update theo dạng realtime
 */
export const typeDefs = `#graphql
 type Folder {
   id: String,
   name: String,
   createdAt: String,
   author: Author,
   notes: [Note]
 }

 type Author {
   id: String,
   name: String

 }

 type Note {
   id: String,
   content: String
 }

 type Query {
   folders: [Folder],
   folder(folderId: String): Folder 
   note(noteId: String): Note
 }

 type Mutation {
  addFolder(name: String!): Folder
 }
`