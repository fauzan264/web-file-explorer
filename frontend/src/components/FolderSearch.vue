<template>
    <div class="p-4">
        <input
            type="text"
            :value="searchQuery"
            @input="updateSearchQuery"
            placeholder="Search folders..."
            class="border p-2 rounded"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref, defineEmits } from 'vue';

    const searchQuery = ref('');

    const emit = defineEmits<{
        (e: 'update:modelValue', value: string): void;
    }>();

    const updateSearchQuery = (event: Event) => {
        const inputElement = event.target as HTMLInputElement;
        searchQuery.value = inputElement.value;
        emit('update:modelValue', inputElement.value);
    };
</script>