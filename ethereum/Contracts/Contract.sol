pragma solidity ^0.4.25;

contract Factory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimumContri) public {
        address campaignAddress;
        campaignAddress = new Campaign(minimumContri, msg.sender);
        deployedCampaigns.push(campaignAddress);
    }
    
    function getDeployedCampaigns() public view returns(address[]){
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request{
        string description;
        uint value;
        address recipient;
        bool isCompleted;
        mapping(address => bool) approvals;
        uint approvalCount;
    }
    
    Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public contributors;
    uint public contributorsCount;
    
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    constructor (uint minimumContri, address creator) public{
        manager = creator;
        minimumContribution = minimumContri;
    }
    
    function contribute() public payable{
        require(msg.value > minimumContribution);
        contributors[msg.sender] = true;
        contributorsCount++;
    }
    
    function createRequest(string desc, uint val, address recp) 
        public restricted {
        Request memory newRequest = Request({
           description: desc,
           value: val,
           recipient: recp,
           isCompleted: false,
           approvalCount: 0
        });
        
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(contributors[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        require(!request.isCompleted);
        require(request.approvalCount > (contributorsCount/2));
        request.isCompleted = true;
        request.recipient.transfer(request.value);
    }

    function getSummary() public view returns(
        uint, uint, uint, uint, address
    ){
        return (
            minimumContribution,
            this.balance,
            requests.length,
            contributorsCount,
            manager
        );
    }

    function getRequestCount() public view returns(uint) {
        return requests.length;
    }
}