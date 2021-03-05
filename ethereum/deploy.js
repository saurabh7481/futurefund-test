const { compileStandard } = require("solc");
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require('web3');
const compiledFactory = require('./build/:Factory.json');

const provider = new HDWalletProvider(
    'future cricket arrange forward skull vacant cabin arena before leisure that salad',
    'https://rinkeby.infura.io/v3/d192927f08c245c5bfebb676d71370fb'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying from account: ", accounts[0]);
    const campaign = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({data: compiledFactory.bytecode})
        .send({gas: '1000000', from: accounts[0]});
    console.log('Contract deployed to: ', campaign.options.address);   
};

deploy();