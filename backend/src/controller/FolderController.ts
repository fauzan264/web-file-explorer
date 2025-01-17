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

        // const mapFolders = folders.map(folder => ({
        //     ...folder,
        //     created_at: folder.createdAt,
        //     updated_at: folder.updatedAt,
        //     createdAt: undefined, // Hilangkan properti asli
        //     updatedAt: undefined,
        // }));

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
        // return res.send(response);

        return {
            success: true,
            message: "List Data Folders",
            data: folders
        }
    } catch (e: unknown) {
        console.error(`Error getting posts: ${e}`)
    }
}
