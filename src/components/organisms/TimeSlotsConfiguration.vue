<template>
  <div class="space-y-5">
    <TimeSlotsConfigurationForm
      class="px-5 py-2.5 rounded-lg bg-gray-200"
      @on-change-configuration="(payload) => changeConfiguration(payload)"
    />

    <article>
      <h4 class="text-xl font-semibold text-gray-800">Availability</h4>
      <h5>Set your weekly recurring schedule</h5>
      <button @click="addFakeTimeSlot" type="button">add abc</button>
      <pre>
                    {{ list }}
        
                </pre
      >
    </article>
  </div>
</template>

<script lang="ts" setup>
import TimeSlotsConfigurationForm from '@/components/organisms/TimeSlotsConfigurationForm.vue'

import useTimeSlotsConfiguration from '@/composables/useTimeSlotsConfiguration'

const { changeConfiguration, list, add } = useTimeSlotsConfiguration()

const addFakeTimeSlot = () => {
  add('monday', {
    startAt: new Date()
  })
}
</script>
