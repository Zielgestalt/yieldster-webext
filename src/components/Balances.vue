<script setup lang="ts">
import { ref } from 'vue'
import { myBalances } from '~/logic/storage'

const fetchBalances = await myBalances()
const balances = ref(fetchBalances)
</script>

<template>
  <div>
    <!-- {{ balances }} -->
    <div v-if="balances" class="is-centered text-flow">
      <div>
        <p class="balance-large">
          {{ balances.totalBalance.toFixed(4) }}
        </p>
        <p>Total Balance in USD</p>
      </div>
      <!-- <div class="balance-balance">
        <p>Total Gain: {{ balances.totalGain }} USD</p>
      </div> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
  .balance-large {
    font-size: 2.75rem;
  }
</style>

