<template>
  <div class="flex items-center space-x-2.5">
    <Checkbox id="isAvailableModel" v-model:checked="isAvailableModel" />
    <div>{{ day }}</div>
    <button @click="emit('add-time-slot', { startAt: new Date() })">Add Time Slot</button>
    <button @click="emit('remove-time-slot')">Remove</button>

    <div v-if="timeSlots.length > 0">
      {{ timeSlots }}
    </div>
    <div v-else>Unavailable</div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { DeepReadonly } from 'vue'
import type { TimeSlotModel } from '@/composables/useTimeSlotsConfiguration'

import { Checkbox } from '@/components/ui/checkbox'

const props = withDefaults(
  defineProps<{
    isAvailable: boolean
    day?: string
    timeSlots?: DeepReadonly<TimeSlotModel[]>
  }>(),
  {
    isAvailable: false,
    day: '',
    timeSlots: () => []
  }
)

const emit = defineEmits<{
  'update:isAvailable': [boolean]
  'add-time-slot': [{ startAt: Date }]
  'remove-time-slot': []
}>()

const isAvailableModel = computed({
  get: () => props.isAvailable,
  set: (value) => emit('update:isAvailable', value)
})
</script>
