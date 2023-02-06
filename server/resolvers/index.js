import fakeData from "../fakeData/index.js"
import { FolderModel } from "../models/index.js"


/** Resolver - Xử lý dữ liệu và trả dữ liệu về cho phía client
 *  dựa theo query mà client gửi lên
 */

export const resolvers = {
  Query: {
    folders: async () => {
      const folders = await FolderModel.find()
      return folders
      //  return fakeData.folders 
    },
    folder: async (parent, args) => {
      const folderId = args.folderId
      const foundFolder = await FolderModel.findOne({
        _id: folderId
      })
      return foundFolder
    },
    note: (parent, args) => {
      const noteId = args.noteId
      return fakeData.notes.find(note => note.id === noteId)
    }
  },
  Folder: {
    author: (parent, args) => {
      const authorId = parent.authorId
      return fakeData.authors.find(author => author.id === authorId)
    },
    notes: (parent, args) => {
      return fakeData.notes.filter(note => note.folderId === parent.id)
    }
  },
  Mutation: {
    addFolder: async (parent, args) => {
      const newFolder = new FolderModel({ ...args, authorId: '123' });
      console.log(newFolder)
      await newFolder.save()
      return newFolder
    }
  }
}
