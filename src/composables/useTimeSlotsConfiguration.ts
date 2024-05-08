import { ref, unref, reactive, readonly } from 'vue'

// #region types
interface TimeSlotModel {
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

const useTimeSlotsConfiguration = () => {
  // TODO: persist
  const list = ref<TimeSlotConfigurationByDayModel>(defaultTimeSlotConfigurationByDay)
  // TODO: persist
  const configuration = reactive<TimeSlotConfigurationModel>({
    canAllowVideoTourCall: false,
    maximumBookingSlotAmount: 1,
    visitDuration: undefined
  })

  // #region by day list
  const add = (day: DayKey, timeSlot: Omit<TimeSlotModel, 'id' | 'endAt'>) => {
    const id = crypto.randomUUID()
    const _visitDurationInMS = parseInt(configuration.visitDuration ?? '60') * 60 * 1000

    list.value[day].timeSlots.push({
      id,
      endAt: new Date(timeSlot.startAt.getTime() + _visitDurationInMS),
      ...timeSlot
    })
  }

  const remove = (day: DayKey, timeSlotId: string) => {
    list.value[day].timeSlots = unref(list)[day].timeSlots.filter(({ id }) => id !== timeSlotId)
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
      configuration.canAllowVideoTourCall = canAllowVideoTourCall

    if (maximumBookingSlotAmount !== undefined)
      configuration.maximumBookingSlotAmount = maximumBookingSlotAmount

    if (visitDuration !== undefined) {
      configuration.visitDuration = visitDuration
      // TODO: reconciliate list
    }
  }
  // #endregion

  return {
    configuration: readonly(configuration),
    changeConfiguration,

    list: readonly(list),
    add,
    remove
  }
}

export default useTimeSlotsConfiguration
