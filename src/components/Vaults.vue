<script setup lang="ts">
import { ref } from 'vue'
import { myVaults, platform } from '~/logic/storage'

const fetchVaults = await myVaults()
const vaults = ref(fetchVaults)

function percentage(value) {
  const percentage = value
  return percentage.toFixed(2)
}

function isPositive(value) {
  if (value >= 0)
    return true

  else
    return false
}
</script>

<template>
  <div>
    <div v-if="vaults" class="vaults">
      <!-- {{ vaults.vaults[0] }} -->
      <div v-for="(vault, index) in vaults.vaults" :key="index" class="vault">
        <a :href="`${platform}/vault/${vault.vault.vaultAddress}/dashboard`" target="_blank">
          <div class="vault-image">
            <img :alt="vault.vault.vaultName" :src="`data:image/jpeg;base64,${vault.vault.logoImg.data}`">
          </div>
          <div class="vault-content">
            <p class="vault-title">
              {{ vault.vault.vaultName }}
            </p>
            <p class="vault-meta">Total APR: <span :class="isPositive(vault.totalAPR) ? 'is-success' : 'is-danger'" class="vault-apr">{{ percentage(vault.totalAPR) }} %</span></p>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .vaults {
    .vault a {
      text-decoration: none;
      color: var(--color);
      padding: 1.5rem 1rem;
      display: grid;
      gap: var(--size-5);
      grid-template-columns: 1fr 7fr;
      border-top: 1px solid var(--bg-hover);
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: var(--bg-hover);
      }

      .vault-image {
        align-self: center;
      }

      .vault-title {
        font-size: var(--fs-3);
      }

      .vault-meta {
        opacity: 0.7;
      }

      .vault-apr {
        font-weight: bold;
        position: relative;
        padding-left: 0.75rem;
        margin-left: 1rem;

        &::before,
        &::after {
          content: "";
          display: block;
          left: 0px;
          position: absolute;
          top: 50%;
        }
       &::before {
          border-color: currentColor;
          border-style: solid;
          border-width: 2px 0 0 2px;
          height: 6px;
          margin-top: -3px;
          width: 6px;

          transform: rotate( 45deg );
          -webkit-transform: rotate( 45deg );
        }
        &::after {
            background: currentColor;
            margin-top: -4px;
            height: 10px;
            width: 2px;
            left: 2px;
        }

        &.is-danger {
          &::before {
            border-width: 0 2px 2px 0;
            margin-top: -1px;
          }
        }
      }
    }
  }
</style>

