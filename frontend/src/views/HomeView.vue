<template>
    <div class="flex h-screen">
        <!-- Left Panel -->
        <div class="w-1/3 bg-gray-50 p-4 overflow-y-auto shadow-lg rounded-lg">
            <FolderSearch v-model="searchQuery" class="pw-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" />
            
            <FolderTree :folders="filteredFolders" @selectFolder="selectFolder" />
        </div>
        
        <!-- Right Panel -->
        <div class="w-2/3 p-4 bg-white flex flex-col shadow-lg rounded-lg">
            <div class="my-4 flex space-x-4">
                <input
                    v-model="newFolderName"
                    type="text"
                    placeholder="Enter new folder name"
                    class="border p-2 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                
                <select
                    v-model="selectedParentFolderId"
                    class="border p-2 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="">Select Parent Folder</option>
                    <option
                        v-for="folder in filteredFolders"
                        :key="folder.id"
                        :value="folder.id"
                    >
                        {{ folder.name }}
                    </option>
                </select>
                
                <button
                    @click="createFolder"
                    class="bg-green-500 text-white px-4 py-2 rounded-md w-1/3 hover:bg-green-600 transition"
                >
                    Create Folder
                </button>
            </div>
            
            <!-- Set FileDisplay to half width -->
            <div class="w-full sm:w-1/2">
                <FileDisplay :folderId="selectedFolderId" />
            </div>
        </div>

        <!-- Modal for Success -->
        <div
            v-if="isModalVisible"
            class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50"
        >
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <h3 class="text-lg font-bold text-green-600">Folder Created Successfully</h3>
                <p class="mt-2 text-gray-700">Your new folder has been added successfully.</p>
                <button
                    @click="closeModal"
                    class="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue';
    import { FolderRepository } from '../repositories/FolderRepository';
    import FolderTree from '../components/FolderTree.vue';
    import FileDisplay from '../components/FileDisplay.vue';
    import FolderSearch from '../components/FolderSearch.vue';
    import { createFolder } from '../services/FolderService';

    // Define Folder type
    interface Folder {
        id: string;
        name: string;
        subfolders?: Folder[];
        isOpen?: boolean;
    }

    const searchQuery = ref('');
    const folders = ref<Folder[]>([]); // Replace any[] with Folder[]
    const selectedFolderId = ref<string | null>(null);
    const newFolderName = ref('');
    const selectedParentFolderId = ref<string | null>('');
    const isModalVisible = ref(false); // Track modal visibility

    onMounted(async () => {
        const folderStructure = await FolderRepository.fetchFolderStructure();
        folders.value = folderStructure.data;
    });

    const filteredFolders = computed(() => {
        return folders.value.filter((folder) =>
            folder.name && folder.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });

    const selectFolder = (folderId: string) => {
        selectedFolderId.value = folderId;
    };

    
    const createFolder = async () => {
        if (!newFolderName.value.trim()) {
            alert('Folder name cannot be empty!');
            return;
        }

        const parentFolderId = selectedParentFolderId.value || null;

        const newFolder = {
            name: newFolderName.value,
            folder_id: parentFolderId,
            subfolders: [],
            isOpen: false,
        };

        try {
            const createdFolder = await FolderRepository.createFolder(newFolder);

            if (parentFolderId) {
                const parentFolder = folders.value.find(folder => folder.id === parentFolderId);
                if (parentFolder && parentFolder.subfolders) {
                    parentFolder.subfolders.push(createdFolder);
                }
            } else {
              folders.value.push(createdFolder);
            }

            newFolderName.value = '';
            selectedParentFolderId.value = '';

            isModalVisible.value = true;
            setTimeout(async () => {
                const folderStructure = await FolderRepository.fetchFolderStructure();
                folders.value = folderStructure.data;
            }, 2000);
        } catch (error) {
            console.error('Error creating folder:', error);
        }
    };

    const closeModal = () => {
        isModalVisible.value = false;
    };
</script>