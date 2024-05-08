<template>
  <div class="space-y-5">
    <TimeSlotsConfigurationForm
      class="px-5 py-2.5 rounded-lg bg-gray-200"
      @on-change-configuration="(payload) => changeConfiguration(payload)"
    />

    <article>
      <h4 class="text-xl font-semibold text-gray-800">Availability</h4>
      <h5>Set your weekly recurring schedule</h5>

      <TimeSlotByDayForm
        v-for="(item, day) in list"
        :key="day"
        :day="day"
        :isAvailable="item.isAvailable"
        @update:isAvailable="toggleDay(day, $event)"
        :timeSlots="item.timeSlots"
        @add-time-slot="(payload) => add(day, payload)"
        @remove-time-slot="() => {
            remove(day, item.timeSlots[0]?.id)

            if (item.timeSlots.length <= 0) toggleDay(day, false)
        }"
      />
    </article>
  </div>
</template>

<script lang="ts" setup>
import TimeSlotsConfigurationForm from '@/components/organisms/TimeSlotsConfigurationForm.vue'
import TimeSlotByDayForm from '@/components/organisms/TimeSlotByDayForm.vue'

import useTimeSlotsConfiguration from '@/composables/useTimeSlotsConfiguration'

const { changeConfiguration, list, toggleDay, add, remove } = useTimeSlotsConfiguration()
</script>
