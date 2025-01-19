import axios from 'axios';

// Define the folder structure interface
export interface Folder {
    id: string;
    name: string;
    subfolders?: Folder[];
}

// Function to get the complete folder structure
export const getFolderStructure = async (): Promise<Folder[]> => {
    try {
        const response = await axios.get('http://localhost:3000/api/v1/folders');
        return response.data as Folder[]; // Assert the response data as an array of Folder objects
    } catch (error) {
        console.error("Error fetching folder structure", error);
        throw error; // Optionally handle errors
    }
};

// Function to get subfolders of a specific folder
export const getSubfolders = async (folderId: string): Promise<Folder[]> => {
    try {
        const response = await axios.get(`http://localhost:3000/api/v1/folders/${folderId}/subfolders`);
        return response.data.data as Folder[]; // Assert the response data as an array of Folder objects
    } catch (error) {
        console.error(`Error fetching subfolders for folder ${folderId}`, error);
        throw error; // Optionally handle errors
    }
};

// Function to create a new folder
export const createFolder = async (folder: Folder): Promise<Folder> => {
    try {
        const response = await axios.post('http://localhost:3000/api/v1/folders', folder, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data as Folder; // Assert the response data as a Folder object
    } catch (error) {
        console.error("Error creating folder", error);
        throw error; // Optionally handle errors
    }
};
