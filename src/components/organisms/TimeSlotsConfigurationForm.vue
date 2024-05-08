<template>
  <form class="space-y-5">
    <div class="space-y-2.5">
      <Label for="duration">Visit Duration</Label>
      <Select id="duration" v-model="visitDuration">
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
              <SelectItem value="15">
                15 min
              </SelectItem>
              <SelectItem value="30">
                30 min
              </SelectItem>
              <SelectItem value="45">
                45 min
              </SelectItem>
              <SelectItem value="60">
                60 min
              </SelectItem>
              <SelectItem value="90">
                90 min
              </SelectItem>
            </SelectGroup>
          </SelectContent>
      </Select>
    </div>

    <div class="space-y-2.5">
      <Label for="maximumBookingSlotAmount">No. of Booking / Session</Label>
      <Input
        id="maximumBookingSlotAmount"
        v-model.number="maximumBookingSlotAmount"
        type="number"
        min="1"
      />
    </div>

    <div class="flex items-center space-x-2.5">
      <Checkbox id="canAllowVideoTourCall" v-model:checked="canAllowVideoTourCall" />
      <Label for="canAllowVideoTourCall">Allow video tour call</Label>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, unref, watch } from 'vue'
import type { TimeSlotConfigurationModel } from '@/composables/useTimeSlotsConfiguration'

import useTimeSlotsConfiguration from '@/composables/useTimeSlotsConfiguration'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const { configuration } = useTimeSlotsConfiguration()

const visitDuration = ref<TimeSlotConfigurationModel['visitDuration'] | undefined>(unref(configuration).visitDuration)
const maximumBookingSlotAmount = ref(unref(configuration).maximumBookingSlotAmount)
const canAllowVideoTourCall = ref(unref(configuration).canAllowVideoTourCall)

const emit = defineEmits<{
    'on-change-configuration': [
        Required<TimeSlotConfigurationModel>
    ]
}>()

watch([visitDuration, maximumBookingSlotAmount, canAllowVideoTourCall], ([_visitDuration, _maximumBookingSlotAmount, _canAllowVideoTourCall]) => {
    if (!_visitDuration) return

    emit('on-change-configuration', {
        visitDuration: _visitDuration,
        maximumBookingSlotAmount: _maximumBookingSlotAmount,
        canAllowVideoTourCall: _canAllowVideoTourCall
    })
})
</script>
