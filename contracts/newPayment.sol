// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract newPayment {
    using ECDSA for bytes32;

    mapping(uint256 => bool) usedNonces;
    uint256 public totalCount;

    uint public price;
    address public seller = 0xc98E9c69119eb0B764B0d5DCbC1532De8bfC2D4f;
    address public buyer;

    enum State { Created, Locked, Inactive}
    State public state;

    constructor() {
        totalCount = 0;
    }

    // 輸入 Gwei
    function itemcost(uint productPrice) public payable{
        price = productPrice * 1e9;     // 無論如何都是 wei
        totalCount += 1;
    }

    // ECDSA橢圓曲線簽名演算法
    function isMessageVaild(uint256 amount, uint256 nonce, bytes memory _signature) public returns (bool){  
        // 進行abi編碼
        // bytes memory abiEncode = abi.encodePacked("HelloWorld");
        // bytes32 messagehash = keccak256(abiEncode);
        require(!usedNonces[nonce]);
        usedNonces[nonce] = true;

        // 重建在客户端签名的信息
        bytes32 messagehash = keccak256(abi.encodePacked(amount, nonce, this));

        bytes32 ethSignedMessageHash = ECDSA.toEthSignedMessageHash(messagehash);
        // 從簽名恢復地址
        address signer = ECDSA.recover(ethSignedMessageHash, _signature);

        if(msg.sender == signer){
            return (true);
        }else{
            return (false);
        }
    }

    
    // 如果在調用此函數時滿足修飾符 _; 的條件，則執行該函數，否則拋出異常。
    modifier condition(bool _condition) {
        require(_condition);
        _;
    }

    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only allow buyers to access.");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Allow seller access only.");
        _;
    }

    modifier inState(State _state) {
        require(state == _state, "The status of the order is not actionable.");
        _;
    }

    event Aborted();
    event PurchaseConfirmed();

    function count() public onlySeller {
        totalCount += 1;
    }
    
    ///買家下單支付以太幣後觸發
    function deposit(uint256 amount, uint256 nonce, bytes memory _signature) public payable {      
        require(msg.value == price, "Please pay according to the item price.");
        require(isMessageVaild(amount, nonce, _signature), "Must need your signature.");

        emit PurchaseConfirmed();
        buyer = payable(msg.sender);
        state = State.Created;
        payable(seller).transfer(address(this).balance); 
    }

    /// 取消購物取回以太幣
    /// 只允許買家訪問，只有賣家未發貨之前可以訪問.
    function abort() public onlyBuyer inState(State.Created) payable{
        emit Aborted();
        state = State.Inactive;
        payable(buyer).transfer(price);
    }
}