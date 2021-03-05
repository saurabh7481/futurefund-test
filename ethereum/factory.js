import web3 from './web3';
import campaignFactory from './build/:Factory.json';

const instance = new web3.eth.Contract(JSON.parse(campaignFactory.interface),
 "0x19D652F95f59db0EfA62268a85C80521063bE2A7");

export default instance;