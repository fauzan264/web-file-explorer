<script setup lang="ts">
import { ref, onMounted } from 'vue';

const folderData = ref([]);

onMounted(async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/folders');
        const result = await response.json();
        folderData.value = result.data;
    } catch (error) {
        console.error('Error fetching folder data:', error);
    }
});
</script>

<template>
    <RouterView />
</template>

<style scoped>
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
    }
</style>
