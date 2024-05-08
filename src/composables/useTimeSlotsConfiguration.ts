import { unref, reactive, readonly } from 'vue'
import { useStorage } from '@vueuse/core'

// #region types
export interface TimeSlotModel {
  id: string
  startAt: Date
  endAt: Date
}

export interface TimeSlotConfigurationModel {
  canAllowVideoTourCall: boolean
  maximumBookingSlotAmount: number
  visitDuration?: '15' | '30' | '45' | '60' | '90'
}

type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thrusday' | 'friday' | 'saturday' | 'sunday'
type TimeSlotConfigurationByDayModel = {
  [day in DayKey]: {
    isAvailable: boolean
    timeSlots: TimeSlotModel[]
  }
}
// #endregion

const defaultTimeSlotConfigurationByDay = (
  ['monday', 'tuesday', 'wednesday', 'thrusday', 'friday', 'saturday', 'sunday'] as DayKey[]
).reduce<TimeSlotConfigurationByDayModel>((acc, day) => {
  acc[day] = {
    isAvailable: false,
    timeSlots: []
  }
  return acc
}, {} as TimeSlotConfigurationByDayModel)
const list = useStorage<TimeSlotConfigurationByDayModel>(
    'timeSlotConfigurationList',
    defaultTimeSlotConfigurationByDay,
    localStorage,
    {
        writeDefaults: true,
        serializer: {
            read: v => (!v || v === 'undefined' ? defaultTimeSlotConfigurationByDay : JSON.parse(v)),
            write: v => JSON.stringify(v)
        }
    }
)

const defaultTimeSlotConfiguration = {
    canAllowVideoTourCall: false,
    maximumBookingSlotAmount: 1,
    visitDuration: undefined
  }
const configuration = useStorage<TimeSlotConfigurationModel>(
    'timeSlotConfiguration',
    defaultTimeSlotConfiguration,
    localStorage,
    {
        writeDefaults: true,
        serializer: {
            read: v => (!v || v === 'undefined' ? defaultTimeSlotConfiguration : JSON.parse(v)),
            write: v => JSON.stringify(v)
        }
    }
)

const useTimeSlotsConfiguration = () => {
  // #region by day list
  const add = (day: DayKey, timeSlot: Omit<TimeSlotModel, 'id' | 'endAt'>) => {
    const id = crypto.randomUUID()
    const _visitDurationInMS = parseInt(unref(configuration).visitDuration ?? '60') * 60 * 1000

    list.value[day].timeSlots.push({
      id,
      endAt: new Date(timeSlot.startAt.getTime() + _visitDurationInMS),
      ...timeSlot
    })
  }

  const remove = (day: DayKey, timeSlotId: string) => {
    list.value[day].timeSlots = unref(list)[day].timeSlots.filter(({ id }) => id !== timeSlotId)
  }

  const toggleDay = (day: DayKey, isAvailable: boolean) => {
    list.value[day].isAvailable = isAvailable
  }
  // #endregion

  // #region configuration
  const changeConfiguration = ({
    canAllowVideoTourCall,
    maximumBookingSlotAmount,
    visitDuration
  }: Partial<TimeSlotConfigurationModel>) => {
    // patch
    if (canAllowVideoTourCall !== undefined)
      configuration.value.canAllowVideoTourCall = canAllowVideoTourCall

    if (maximumBookingSlotAmount !== undefined)
      configuration.value.maximumBookingSlotAmount = maximumBookingSlotAmount

    if (visitDuration !== undefined) {
      configuration.value.visitDuration = visitDuration
      // TODO: reconciliate list
    }
  }
  // #endregion

  return {
    configuration: readonly(configuration),
    changeConfiguration,

    list: readonly(list),
    toggleDay,
    add,
    remove
  }
}

export default useTimeSlotsConfiguration
