<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import crypto_, { useCryptoStore } from '../store/crypto'

// 引用crypto.vue的const宣告變數
// import crypto_ from '../store/user'

const defineStore = useCryptoStore()
const { deposit, itemcost, connectWallet, new_onSign, new_count } = useCryptoStore()
const { account, showTWDtoGwei, TWDtoEth, count } = storeToRefs(defineStore)

const getAmount = ref(0)
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl m-4">
      Payment
    </h1>
    <div v-if="!account">
      <P class="MsoNormal">～～。鍋兒滾付款。～～</P><br>
      <P class="MsoNormal">點擊下方橙色按鈕連結錢包登入付款</P><br>
      <p>Only for Metamask --Goerli network.</p>
    </div>
    <button v-if="!account" class="bg-amber-600 rounded p-4" @click="connectWallet">
      Connect Wallet
    </button>

    <div v-if="account" class="border shadow w-4/12 p-4 mt-10">
      <P class="MsoNormal" style="font-size: 1.5rem;">～～。鍋兒滾付款。～～</P><br>
      <input
        v-model="getAmount"
        :style="{ width: '100px' }"
        name="AmountInfo"
        class="py-4 px-4 shadow border rounded"
        maxlength="15"
      >

      <button class="bg-slate-500 rounded p-4 mt-10" @click="itemcost(getAmount)">
        確定金額
      </button>
      <p>輸入單位: TWD</p>
      <p>Show TWD to Gwei: {{ showTWDtoGwei }} gwei</p>

      <button class="bg-cyan-600 rounded p-4 mt-10" @click="new_onSign(getAmount)">
        確認簽名
      </button>
      <div style="word-break: break-all;">
        <p class="m-4">
          Signature : {{ crypto_.Sig }}
        </p>
        <p>nonce: {{ count }}</p>
      </div>

      <button class="bg-cyan-400 rounded p-4 mt-10" @click="deposit(getAmount)">
        確認付款
      </button>

      <p>Show TWD to Eth: {{ TWDtoEth }} ether</p>
      <p> &emsp;</p>

      <!-- <button class="bg-slate-600 rounded p-4 mt-10" @click="new_count()">
        更新count
      </button> -->
    </div>

    <div v-if="account && crypto_.Onlyowner === account" class="border shadow w-4/12 p-4 mt-10">
      <p style="font-size: 1.5rem;">Hello, owner !</p><br>
      <p>沒事最好不要手濺按底下按鈕</p>
      <button class="bg-red-500 rounded p-4 mt-10" @click="new_count()">
        nonce +1
      </button><p> &emsp;</p>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
