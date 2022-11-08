/* eslint-disable no-alert */
/* eslint-disable no-console */
import { ethers } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'

import contractABI from '../artifacts/contracts/newPayment.sol/newPayment.json'
const contractAddress = '0x200ba3A22eD8B40A53eBD163A904f14681c0132B'
const Onlyowner = '0xc98e9c69119eb0b764b0d5dcbc1532de8bfc2d4f'

const Sig = ref('0x')
// 預設匯出 !重要
export default {
  Sig, Onlyowner,
}

export const useCryptoStore = defineStore('user', () => {
  const account = ref(null)
  const count = ref(0)
  const loading = ref(false)
  const Amount = ref(0)
  const showTWDtoGwei = ref('non')
  const TWDtoEth = ref()
  const showTWDtoEth = ref('non')

  async function getBalance() {
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const SimplePayContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        const count = (await SimplePayContract.getBalance())
        const amt = ethers.utils.formatEther(count)
        console.log('count', amt)
        setLoader(false)
      }
    }
    catch (e) {
      setLoader(false)
      console.log('e', e)
    }
  }

  // ------------------------------------------------------
  async function itemcost(TWDtoGwei: any) {
    console.log('setting loader')
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        const SimplePayContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        // gwei to wei -> 乘以10的9次
        TWDtoGwei = TWDtoGwei * 20000 // gwei
        showTWDtoGwei.value = TWDtoGwei
        TWDtoEth.value = TWDtoGwei / 1e9
        showTWDtoEth.value = TWDtoEth.value

        // 號碼牌押在這裡
        const nonce = (await SimplePayContract.totalCount())
        count.value = nonce

        // 清空簽名
        Sig.value = '0x'

        const costInput = await SimplePayContract.itemcost(TWDtoGwei)

        console.log('loading....', costInput)
        await costInput.wait()
        console.log('loaded -- ', costInput)
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  async function deposit(TWD: any) {
    console.log('setting loader')
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        const SimplePayContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        const send_token_amount = TWD * 0.00002

        const overrides = {
          value: ethers.utils.parseUnits(send_token_amount.toString(), 18),
          gasLimit: 300000,
        }

        TWD = TWD * 20000 // gwei
        const _sig = ethers.utils.arrayify(Sig.value)
        // const nonce = (await SimplePayContract.totalCount())

        // const bytes32 = ethers.utils.formatBytes32String(Sig.value)
        const depositTxn = await SimplePayContract.deposit(TWD, count.value, _sig, overrides)

        console.log('loading....', depositTxn)
        await depositTxn.wait()
        console.log('loaded -- ', depositTxn)
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  async function new_count() {
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        const SimplePayContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        const costInput = (await SimplePayContract.count())

        console.log('loading....', costInput)
        setLoader(false)
      }
    }
    catch (e) {
      setLoader(false)
      console.log('e', e)
    }
  }
  // --------------------------------------------------------------

  async function connectWallet() {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('Must connect to MetaMask!')
        return
      }

      // 授權獲取帳戶
      const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Connected: ', myAccounts[0])
      account.value = myAccounts[0]

      await getBalance()
      // await onSign()
    }
    catch (error) {
      console.log(error)
    }
  }

  // 客戶端進行鏈下簽名
  // 簽署一個簡單的字符串，用於登錄服務
  async function new_onSign(TWDtoGwei: any) {
    try {
      // 1. 建構 Provider
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum) // 連接以太坊網路 (Provider)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        // const SimplePayContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        TWDtoGwei = TWDtoGwei * 20000 // gwei
        // const nonce = (await SimplePayContract.totalCount())
        // count.value = nonce

        // 2. 簽名內容 進行 solidity Keccak256 Hash
        const messageHsh = ethers.utils.solidityKeccak256(['uint256', 'uint256', 'address'], [TWDtoGwei, count.value, contractAddress])

        // 3. 轉成 bytes
        const arrayifyMessage = ethers.utils.arrayify(messageHsh)

        // 4. 使用私鑰進行消息簽名
        const Signature = await signer.signMessage(arrayifyMessage)
        Sig.value = Signature
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  // ------------------------------------------------

  function setLoader(value: boolean) {
    console.log('setloader', value)
    loading.value = value
  }

  return {
    setLoader,
    loading,
    connectWallet,
    account,
    count,
    Amount,
    Sig,
    itemcost,
    deposit,
    showTWDtoGwei,
    TWDtoEth,
    showTWDtoEth,
    new_onSign,
    new_count,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot))
