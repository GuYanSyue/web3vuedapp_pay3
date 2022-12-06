<script setup lang="ts">
import { storeToRefs } from 'pinia'
import crypto_, { useCryptoStore } from '../store/crypto'

const defineStore = useCryptoStore()
const { addItem, downItem } = useCryptoStore()
const { quantity, price, quantity2, price2, quantity3, price3, quantity4, price4, addItem_Sum } = storeToRefs(defineStore)
</script>

<template>
  <header>
    <div class="overlay" />
    <nav>
      <u><b> <font color="#FFD39B" size="7">鍋兒滾</font></b></u>
    </nav>
  </header>

  <table>
    <tr class="title">
      <td width="25%">
        商品
      </td>
      <td>名稱</td>
      <td>價格</td>
      <td>數量</td>
      <td>總計</td>
    </tr>
    <tr>
      <td>
        <img src="https://imgur.com/OWNGUEz.jpg" width="250" height="150">
      </td>
      <td>日式鍋</td>
      <td class="unit">$100</td>
      <td class="number">
        <span class="down" @click="downItem(1)">-</span><span class="num">{{ quantity }}</span><span class="add" @click="addItem(1)">+</span>
      </td>
      <td class="price">{{ price }}</td>
    </tr>
    <tr>
      <td>
        <img src="https://imgur.com/OWNGUEz.jpg" width="250" height="150">
      </td>
      <td>泡菜鍋</td>
      <td class="unit">$110</td>
      <td class="number">
        <span class="down" @click="downItem(2)">-</span><span class="num">{{ quantity2 }}</span><span class="add" @click="addItem(2)">+</span>
      </td>
      <td class="price">{{ price2 }}</td>
    </tr>
    <tr>
      <td>
        <img src="https://imgur.com/OWNGUEz.jpg" width="250" height="150">
      </td>
      <td>牛奶鍋</td>
      <td class="unit">$120</td>
      <td class="number">
        <span class="down" @click="downItem(3)">-</span><span class="num">{{ quantity3 }}</span><span class="add" @click="addItem(3)">+</span>
      </td>
      <td class="price">{{ price3 }}</td>
    </tr>
    <tr>
      <td>
        <img src="https://imgur.com/OWNGUEz.jpg" width="250" height="150">
      </td>
      <td>壽喜燒鍋</td>
      <td class="unit">$130</td>
      <td class="number">
        <span class="down" @click="downItem(4)">-</span><span class="num">{{ quantity4 }}</span><span class="add" @click="addItem(4)">+</span>
      </td>
      <td class="price">{{ price4 }}</td>
    </tr>
  </table>

  <div class="box" style="margin: auto; text-align: center;">
    <p>已選了 <span class="total-num">{{ addItem_Sum }}</span> 個商品</p>
    <p>總共: <span class="total-price">{{ crypto_.totalPrice }}</span> $</p>
  </div><p>&emsp;</p>

  <div style="width: 100%;">
    <div v-if="addItem_Sum === 0">
      <button class="bg-slate-500 rounded p-4 b-color w-50">你還沒選擇任何商品噢</button>
    </div>
    <div v-else>
      <router-link to="/Buyingcart">
        <button class="bg-red-600 rounded p-4 b-color w-50">去結帳</button>
      </router-link><router-view />
    </div>
  </div><p>&emsp;</p>
</template>

<style lang="scss" src="../components/styles.css" scoped></style>
