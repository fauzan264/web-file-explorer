<script setup lang="ts">
    import { ref, watch, defineProps } from 'vue';
    import { FolderRepository } from '../repositories/FolderRepository';

    interface File {
        id: string;
        name: string;
        type: 'file' | 'folder';
    }

    interface Folder {
        id: string;
        name: string;
        folder_id: string;
        created_at: string;
        updated_at: string | null;
        files: File[];
        subfolders?: Folder[];
    }

    const props = defineProps<{
        folderId: string | number | null;
    }>();

    const files = ref<File[]>([]);

    const fetchFiles = async () => {
        if (props.folderId === null) return;

        const fetchedData = await FolderRepository.fetchSubfolders(props.folderId);

        files.value = [];

        fetchedData.forEach((folder: Folder) => {
            files.value.push({ ...folder, type: 'folder' });

            if (folder.files && folder.files.length > 0) {
                folder.files.forEach((file: File) => {
                    files.value.push({ ...file, type: 'file' });
                });
            }
        });
    };

    watch(() => props.folderId, fetchFiles, { immediate: true });
</script>

<template>
    <div class="p-4">
        <h2 class="text-xl font-bold">Files in Folder</h2>
        <ul>
            <li v-for="file in files" :key="file.id" class="flex items-center mb-2">
                <template v-if="file.type === 'folder'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-6l-2-2H10z" />
                    </svg>
                </template>
                <template v-if="file.type === 'file'">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H7" />
                    </svg>
                </template>
                
                <span class="text-gray-800">{{ file.name }}</span>
            </li>
        </ul>
    </div>
</template>