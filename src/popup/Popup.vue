<script setup lang="ts">
import { darkMode } from '~/logic/storage'

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
      <div>
        <Suspense>
          <PopupDisplay :key="timekey" />
        </Suspense>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
  main {
    width: 357px;
    min-height: 600px;
    width: 100%;
  }
</style>
