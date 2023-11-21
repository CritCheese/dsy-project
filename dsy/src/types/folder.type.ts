export type Folder = {
    id: string,
    foldername: string,
    owner: string,
    mimetype: string,
    shared: boolean,
    copyable: boolean,
    hasThumbnail: boolean,
    thumbnail?: string,
    hasChildren?: boolean,
    children?: Folder[]
}