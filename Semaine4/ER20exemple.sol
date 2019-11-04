
/*

interface ERC20vivien {
    function totalSupply() public view returns (uint256);
    function balanceOf(address account) public view returns (uint256);
    function transfer(address recipient, uint256 amount) public returns (bool;
    function allowance(address owner, address spender) public view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, adresse recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 _value);
    event Approval(address indexed owner, address indexed _spender, uint _value);
}

*/




pragma solidity ^0.5.0;


contract ERC20vivien {
    string public name = "VivienCoin";
    string public symbol = "VIC";
    uint public decimals = 18;
    uint private _totalSupply = 100000;
    mapping (address => uint256) private _balances;
    //on va chercher une valeur associe a adresse qui va etre notre variable _balances
    
    mapping (address => mapping (address => uint256)) private _allowances;
    // pour une adresse donne on va aller chercher la vauleur autorise pour une adresse donnee et ca va etre notre variable allowance
    
    constructor() public{
        _balances[msg.sender] = _totalSupply;
    }


   
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

   
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
    
    
   
   
    function transfer(address recipient, uint256 amount) public returns (bool) {
        
        
        require(msg.sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        
        _balances[msg.sender] = _balances[msg.sender] - amount;
        _balances[recipient] = _balances[recipient] + amount;
        
        
        return true;
    }
    
    
   
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }
    
    
    function approve(address spender, uint256 amount) public returns (bool) {
        require(msg.sender != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        
        
        _allowances[msg.sender][spender] = amount;
        

        return true;
    }
    
    
    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        require(_allowances[sender][msg.sender] >= amount, 'Plafond de depense non autorise');
        require(_balances[sender] >= amount, 'Solde insuffisant sur le compte');
        //on va  prendre une adresse et depenser a partir de cette addresse

        
        _balances[sender] = _balances[sender] - amount;
        _balances[recipient] = _balances[recipient] + amount;
        
        
       
        return true;
    }
    
    
   

    
    
    
}