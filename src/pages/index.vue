<!-- eslint-disable vue/singleline-html-element-content-newline -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import crypto_, { useCryptoStore } from '../store/crypto'

// 引用crypto.vue的const宣告變數
// import crypto_ from '../store/user'

const defineStore = useCryptoStore()
const { deposit, itemcost, connectWallet, new_onSign, new_count } = useCryptoStore()
const { discount, showTWDtoEth, showDisGwei, sum, disSum, account, showTWDtoGwei, TWDtoEth, count } = storeToRefs(defineStore)

const getAmount = ref(0)
// const checked = ref(true)
</script>

<template>
  <div class="flex flex-col items-center">
    <p class="text-2xl m-4" style="font-size: 2.3rem;">Payment</p>

    <div v-if="!account">
      <P class="MsoNormal">～～。鍋兒滾付款。～～</P>
      <P class="MsoNormal">點擊下方橙色按鈕連結錢包登入付款</P><br>
      <p>Only for Metamask --Goerli network.</p>
    </div>
    <button v-if="!account" class="bg-amber-600 rounded p-4 b-color" @click="connectWallet">
      Connect Wallet
    </button>

    <div v-if="account" class="outsidebox">
      <P class="tit1"><span class="hide">～</span>～。鍋兒滾付款。～<span class="hide">～</span></P><br>

      <p class="MsoNormal">您持有本店NFT數量為:&nbsp;<span>{{ sum }}</span>&nbsp;個</p>

      <input
        v-model="getAmount"
        :style="{ width: '100px' }"
        name="AmountInfo"
        class="py-4 px-4 shadow border rounded"
        maxlength="15"
      >
      <button class="bg-slate-500 rounded p-4 mt-10 b-color" @click="itemcost(getAmount)">
        確定金額
      </button>
      <p>(輸入單位: TWD)</p><br>
      <p>Show TWD to Gwei: {{ showTWDtoGwei }} gwei</p>
      <p>Show TWD to Ether: {{ showTWDtoEth }} ether</p><br>

      <p> &emsp;</p>
      <p class="link-top" /><br>

      <div class="MsoNormal" style="border: solid #a9b4bea9 1px;">
        <p v-if="sum !== 0" class="hide">(持有NFT: {{ sum }}個，可折抵新台幣 {{ disSum }} 元)<br></p>
        <p v-if="sum !== 0" class="show box">(持有NFT: {{ sum }}個)<br>=> 可折抵新台幣 {{ disSum }} 元<br></p>

        <div class="box">
          <!-- <input id="checkbox" v-model="checked" type="checkbox">
          <span class="MsoNormal">&emsp;使用NFT進行折價&emsp;</span> -->
          <div v-if="sum !== 0">
            <p class="tit2">會員優惠價:<span class="show"><br>&emsp;&emsp;</span>&emsp;新台幣 {{ discount }} 元</p>
            <p class="link-top" style="border-top: solid #a9b4bea9 2px;" /><br>
          </div>

          <p style="font-size: 1.35rem;">付款詳情</p>
          <p>
            <br>新台幣付款金額: {{ discount }} 元<br>換算Gwei: {{ showDisGwei }} gwei<br>換算乙太幣: {{ TWDtoEth }} ether
          </p>
        </div>
      </div>

      <div v-if="sum !== 0">
        <button class="bg-cyan-600 rounded p-4 mt-10 b-color" @click="new_onSign(discount)">
          確認簽名(會員)
        </button>
      </div>
      <div v-if="sum === 0">
        <button class="bg-cyan-600 rounded p-4 mt-10 b-color" @click="new_onSign(getAmount)">
          確認簽名
        </button>
      </div>
      <div class="box">
        <p class="m-4">Signature : {{ crypto_.Sig }}</p>
      </div>

      <button class="bg-red-600 rounded p-4 mt-10 b-color" @click="deposit(getAmount)">
        確認付款
      </button>
      <p>Show TWD to Eth: {{ TWDtoEth }} ether</p>

      <p> &emsp;</p>
    </div>

    <div v-if="account && crypto_.Onlyowner === account" class="outsidebox">
      <p style="font-size: 1.8rem;">Hello, owner !</p><br>

      <p>非必要沒事最好不要手按底下按鈕</p>
      <button class="bg-red-500 rounded p-4 mt-10 b-color" @click="new_count()">
        nonce +1
      </button><p> &emsp;</p>
      <div style="word-break: break-all;">
        <p style="float: right;">nonce: {{ count }} </p>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
