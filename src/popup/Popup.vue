<script setup lang="ts">
import { darkMode, hasWallet } from '~/logic/storage'

const mode = computed(() => {
  if (darkMode.value)
    return 'dark'
  else
    return ''
})

const timekey = Math.floor(Date.now() / 1000)

function openOptionsPage() {
  browser.runtime.openOptionsPage()
}
</script>

<template>
  <main :data-theme="mode">
    <div class="container text-flow">
      <div class="is-centered">
        <Logo />
      </div>
      <div v-if="hasWallet()">
        <Suspense>
          <PopupDisplay :key="timekey" />
        </Suspense>
      </div>
      <div v-else class="no-wallet text-flow">
        <p>
          Please enter a wallet address in the options page
        </p>
        <button class="btn mt-2" @click="openOptionsPage">
          Open Options
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
  main {
    min-height: 600px;
    width: 100%;
  }

  .no-wallet {
    padding: 2rem;
    text-align: center;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
