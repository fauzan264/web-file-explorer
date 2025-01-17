interface File {
    id: number;
    name: string;
}

interface SubFolder {
    id: number;
    name: string;
}

interface Folder {
    id: number;
    name: string;
    subFolder: SubFolder[];
    files: File[];
}

export { Folder, File, SubFolder };