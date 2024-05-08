<template>
    <div>
        <AddTimeSlotForm class="px-5 py-2.5 rounded-lg bg-gray-200" @on-change-configuration="(payload) => changeConfiguration(payload)"/>
        <button @click="addFakeTimeSlot" type="button">add abc</button>
        <pre>
            {{ list }}

        </pre>
    </div>
</template>

<script lang="ts" setup>
import AddTimeSlotForm from '@/components/organisms/AddTimeSlotForm.vue'

import useTimeSlotsConfiguration from '@/composables/useTimeSlotsConfiguration'

const { changeConfiguration, list, add } = useTimeSlotsConfiguration()

const addFakeTimeSlot = () => {
    add('monday', {
        startAt: new Date()
    })
}
</script>