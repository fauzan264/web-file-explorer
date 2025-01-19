import { getFolderStructure, getSubfolders, createFolder } from '../services/FolderService';

interface Folder {
    id: string;
    name: string;
    subfolders?: Folder[];
}

export const FolderRepository = {
    async fetchFolderStructure(): Promise<Folder[]> {
        return await getFolderStructure();
    },

    async fetchSubfolders(folderId: string): Promise<Folder[]> {
        return await getSubfolders(folderId);
    },

    async createFolder(newFolder: Folder): Promise<Folder> {
        return await createFolder(newFolder);
    },
};
