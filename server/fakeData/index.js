export default {
  authors: [
    {
      id: 1,
      name: 'HoleTex'
    },
    {
      id: 2,
      name: 'Mond'
    }
  ],
  folders: [
    {
      id: "1", 
      name: 'Home',
      createdAt: '2022-11-18T03:42:14Z',
      author: 1
    },
    {
      id: "2",
      name: 'New Folder',
      createdAt: '2022-11-18T03:42:14Z',
      author: 1
    },
    {
      id: "3",
      name: 'Work',
      createdAt: '2022-11-18T03:42:14Z',
      author: 2
    }
  ],
  notes: [
    {
      id: "123",
      content: "<p>Go to market</p>",
      folderId: "1"
    },
    {
      id: "213",
      content: "<p>Go to school</p>",
      folderId: "1"
    },
    {
      id: "234",
      content: "<p>Go to park</p>",
      folderId: "2"
    },
    {
      id: "456",
      content: "<p>Go to home</p>",
      folderId: "3"
    }
  ]
}
