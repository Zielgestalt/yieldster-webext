import { useFetch } from '@vueuse/core'
import { useStorageLocal } from '~/composables/useStorageLocal'

export const wallet = useStorageLocal('wallet', '', { listenToStorageChanges: true })
export const vaults = useStorageLocal('vaults', [], { listenToStorageChanges: true })
export const staging = useStorageLocal('staging', true, { listenToStorageChanges: true })
export const darkMode = useStorageLocal('darkmode', true, { listenToStorageChanges: true })

const apiUrl = 'https://live.yieldster.finance'
const platformUrl = 'https://yieldster.finance'
export const api = ref(apiUrl)
export const platform = ref(platformUrl)

const endMyVaults = '/Vault/v2.0/yieldster/getVaultDetailsByFilter?pageNumber=0&pageSize=10&type=MY_VAULT&accountAddress='
const endMyBalances = '/user/v2.0/yieldster/getFinancialDetails?accountAddress='

const refetch = ref(true)

const sleepUntil = async (f, timeoutMs) => {
  return new Promise((resolve, reject) => {
    const timeWas = new Date()
    const wait = setInterval(() => {
      if (f()) {
        console.log('resolved after', new Date() - timeWas, 'ms')
        clearInterval(wait)
        resolve()
      }
      else if (new Date() - timeWas > timeoutMs) { // Timeout
        console.log('rejected after', new Date() - timeWas, 'ms')
        clearInterval(wait)
        reject()
      }
    }, 20)
  })
}

export async function myVaults() {
  const vaults = reactive({
    data: computed(async () => {
      try {
        await sleepUntil(() => wallet.value !== '', 5000)
        try {
          const {
            data,
          } = await useFetch(apiUrl + endMyVaults + wallet.value, { refetch }).get()

          const json = JSON.parse(data.value as string)
          return json.data.data
        }
        catch (e) {
          return null
        }
      }
      catch {
        return null
      }
    }),
  })

  return vaults.data
}

export async function myBalances() {
  const balances = reactive({
    data: computed(async () => {
      try {
        await sleepUntil(() => wallet.value !== '', 5000)
        try {
          const {
            data,
          } = await useFetch(apiUrl + endMyBalances + wallet.value, { refetch }).get()

          const json = JSON.parse(data.value as string)
          return json.data
        }
        catch (e) {
          return null
        }
      }
      catch {
        return null
      }
    }),
  })

  return balances.data
}
