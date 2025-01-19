<template>
    <div class="overflow-y-auto max-h-full">
        <ul>
            <li v-for="folder in folders" :key="folder.id" class="mb-2">
                <div class="flex items-center cursor-pointer" @click="handleFolderClick(folder)">
                    <span v-if="folder.sub_folder" class="mr-2">
                        <svg
                            v-if="folder.isOpen"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M6 10a1 1 0 011-1h8a1 1 0 110 2H7a1 1 0 01-1-1z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                    <span class="font-bold text-lg text-gray-800">{{ folder.name }}</span>
                </div>
                
                <FolderTree
                    v-if="folder.isOpen"
                    :folders="folder.sub_folder"
                    @selectFolder="selectFolder"
                    class="pl-6 text-gray-600"
                />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import { defineProps, defineEmits } from 'vue';
    import FolderTree from './FolderTree.vue';
    
    interface Folder {
        id: string;
        name: string;
        sub_folder?: Folder[];
        isOpen?: boolean;
    }

    defineProps<{
        folders: Folder[]; 
    }>();

    const emit = defineEmits<{
        (e: 'selectFolder', folderId: string): void;
    }>();

    const handleFolderClick = (folder: Folder) => {
        folder.isOpen = !folder.isOpen;
        emit('selectFolder', folder.id);
    };
</script>