import { expect } from "bun:test";
import prisma from "../../prisma/client";
import { Folder } from "../models/types";
import createResponse from "../utils/responseHelper";

export async function getFolders() {
    try {
        const folders = await prisma.folder.findMany({
            include: {
                subFolder: true,
                files: true
            }
        })

        // async function getFoldersWithSubFolders(parentId: number | null = null) {
        //     // Ambil folder dengan parentId tertentu
        //     const folders = await prisma.folder.findMany({
        //         where: { folderId: parentId }, // folderId adalah parent_id
        //         include: { files: true }, // Sertakan files jika perlu
        //     });
        
        //     // Loop untuk mendapatkan subfolder
        //     for (const folder of folders) {
        //         folder.subFolder = await getFoldersWithSubFolders(folder.id); // Rekursi
        //     }
        
        //     return folders;
        // }

        // const folders = await getFoldersWithSubFolders(3);
        
        const response = createResponse<Folder>({
            status: 'success',
            code: 200,
            message: 'Folders fetched successfully',
            data: folders
        });
        
        return response
    } catch (e: unknown) {
        console.error(`Error getting posts: ${e}`)
    }
}

export async function createFolder(options: {
    name: string;
    folder_id: number
}) {
    try {
        const { name, folder_id } = options;

        const folder = await prisma.folder.create({
            data: {
                name: name,
                folderId: folder_id
            },
        })

        const response = createResponse<Folder>({
            status: 'success',
            code: 200,
            message: 'Folder success created',
            data: folder
        })

        return response
    } catch (e: unknown) {
        console.error(`Error creating folder: ${e}`);
    }
}