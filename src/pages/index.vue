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

  <div class="hide">
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
          <img src="https://imgur.com/aEetXte.jpg" width="250" height="150">
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
          <img src="https://imgur.com/GaeRPbT.jpg" width="250" height="150">
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
          <img src="https://imgur.com/3AfJnr7.jpg" width="250" height="150">
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
          <img src="https://imgur.com/Eaeg6ie.jpg" width="250" height="150">
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
        <button class="bg-slate-500 rounded p-4 b-color w-50">還沒選擇任何商品噢</button>
      </div>
      <div v-else>
        <router-link to="/Buyingcart">
          <button class="bg-red-600 rounded p-4 b-color w-50">去結帳</button>
        </router-link><router-view />
      </div>
    </div><p>&emsp;</p>
  </div>

  <div class="outsidebox">
    <div class="itembox">
      <div class="itempic"><img src="https://imgur.com/aEetXte.jpg"></div>
      <div class="itemAmount">
        <div class="itemtit">日式鍋</div>
        <div class="amount">
          <p style="margin-bottom: 5px;">$100</p>
          <span class="down" @click="downItem(1)">-</span><span class="num">&emsp;{{ quantity }}&emsp;</span><span class="add" @click="addItem(1)">+</span>
          <br><p class="price money">總計:&emsp;{{ price }}元</p>
        </div>
      </div>
    </div>

    <div class="itembox">
      <div class="itempic"><img src="https://imgur.com/GaeRPbT.jpg"></div>
      <div class="itemAmount">
        <div class="itemtit">泡菜鍋</div>
        <div class="amount">
          <p style="margin-bottom: 5px;">$110</p>
          <span class="down" @click="downItem(2)">-</span><span class="num">&emsp;{{ quantity2 }}&emsp;</span><span class="add" @click="addItem(2)">+</span>
          <br><p class="price money">總計:&emsp;{{ price2 }}元</p>
        </div>
      </div>
    </div>

    <div class="itembox">
      <div class="itempic"><img src="https://imgur.com/3AfJnr7.jpg"></div>
      <div class="itemAmount">
        <div class="itemtit">牛奶鍋</div>
        <div class="amount">
          <p style="margin-bottom: 5px;">$120</p>
          <span class="down" @click="downItem(3)">-</span><span class="num">&emsp;{{ quantity3 }}&emsp;</span><span class="add" @click="addItem(3)">+</span>
          <br><p class="price money">總計:&emsp;{{ price3 }}元</p>
        </div>
      </div>
    </div>

    <div class="itembox">
      <div class="itempic"><img src="https://imgur.com/IEW1jx8.jpg"></div>
      <div class="itemAmount">
        <div class="itemtit">壽喜燒鍋</div>
        <div class="amount">
          <p style="margin-bottom: 5px;">$130</p>
          <span class="down" @click="downItem(4)">-</span><span class="num">&emsp;{{ quantity4 }}&emsp;</span><span class="add" @click="addItem(4)">+</span>
          <br><p class="price money">總計:&emsp;{{ price4 }}元</p>
        </div>
      </div>
    </div>

    <div class="last">
      <p class="tnum">已選了&emsp;{{ addItem_Sum }}&emsp;個商品 </p>
      <p class="tnum">總共:&emsp;{{ crypto_.totalPrice }}&emsp;$</p>
    </div>
    <div class="link-top"></div>
    <div v-if="addItem_Sum === 0">
      <button class="bg-slate-500 rounded p-4 b-color w-50">還沒選擇任何商品噢</button>
    </div>
    <div v-if="addItem_Sum !== 0">
      <router-link to="/Buyingcart">
        <button class="bg-red-600 rounded p-4 b-color w-50">去結帳</button>
      </router-link><router-view />
    </div>
  </div>
</template>

<style lang="scss" src="../components/styles.css" scoped></style>
