import { Folder } from "../types/folder.type";

export const myFolder: Folder[] = [
    {
      id: "my_storage",
      foldername: "My Storage",
      mimetype: "",
      shared: false,
      copyable: false,
      hasThumbnail: false,
      owner: "owner",
      hasChildren: true,
      children: [
        {
          id: "123-abc",
          foldername: "Copy Folder 1",
          mimetype: "audio/mpeg",
          hasThumbnail: false,
          shared: false,
          owner: "Thu Huong",
          copyable: false,
        },
        {
          id: "123-abcd",
          foldername: "Copy Folder 2",
          mimetype: "audio/mpeg",
          hasThumbnail: false,
          shared: false,
          owner: "Thu Huong",
          copyable: false,
          hasChildren: true,
          children: [
            {
              id: "123-abcde",
              foldername: "Copy Folder 3",
              mimetype: "audio/mpeg",
              hasThumbnail: false,
              shared: false,
              owner: "Thu Huong",
              copyable: false,
              hasChildren: false,
            },
            {
              id: "123-abcdef",
              foldername: "Copy Folder 4",
              mimetype: "audio/mpeg",
              hasThumbnail: false,
              shared: false,
              owner: "Thu Huong",
              copyable: false,
              hasChildren: false,
            },
          ],
        },
      ],
    },
  ];

  