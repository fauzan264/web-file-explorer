interface File {
    id: number;
    name: string;
}

interface SubFolder {
    id: number;
    name: string;
    createdAt: string;
}

interface Folder {
    id: number;
    name: string;
    createdAt: string;
    subFolder: SubFolder[];
    files: File[];
}

export { Folder, File, SubFolder };