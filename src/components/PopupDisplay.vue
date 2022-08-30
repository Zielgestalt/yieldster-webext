<script setup lang="ts">
import { ref } from 'vue'
import { myBalances, myVaults } from '~/logic/storage'

const fetchVaults = await myVaults()
const vaults = ref(fetchVaults)
const fetchBalances = await myBalances()
const balances = ref(fetchBalances)
</script>

<template>
  <div class="text-flow">
    <div class="balances">
      <Suspense>
        <template #default>
          <Balances />
        </template>
        <template #fallback>
          <div class="is-centered fallback balances">
            <Loading />
            <p>Loading your balances...</p>
          </div>
        </template>
      </Suspense>
    </div>

    <Suspense>
      <template #default>
        <Vaults />
      </template>
      <template #fallback>
        <div class="is-centered fallback vaults">
          <Loading />
          <p>Loading vaults...</p>
        </div>
      </template>
    </Suspense>
  </div>
</template>

<style scoped lang="scss">
  .balances {
    min-height: 124px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
