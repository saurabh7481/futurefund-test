import React, {Component} from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Layout from '../../components/layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeFrom from '../../components/contributeform';
import {Link} from '../../routes';

class CampaignShow extends Component{
    static async getInitialProps(props){
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            contributorsCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards(){
        const {
            balance,
            manager,
            minimumContribution,
            contributorsCount,
            requestCount
        } = this.props;
        const items = [
            {
                header: manager,
                meta: "Manager Address",
                description: "This campaign was created by this manager. This address can create requests",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: "Current Fund/Balance(ether) in the project",
                description: "The amount of fund contributed to this campaign yet.",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution",
                description: "Minimum Contribution(in wei) required to join contributors list.",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: contributorsCount,
                meta: "Contributors Count",
                description: "Number of contributors in the campaign.",
                style: {overflowWrap: 'break-word'}
            },
            {
                header: requestCount,
                meta: "Request Count",
                description: "Total number of requests by manager.",
                style: {overflowWrap: 'break-word'}
            }
        ]

        return <Card.Group items={items} />;
    }
    render(){
        return (
            <Layout>
                <Grid>
                    <Grid.Row>
                    <Grid.Column width={10}>
                        <h2>Show Campaigns</h2>
                        {this.renderCards()}           
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeFrom address={this.props.address}/>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <Button primary>View Requests</Button>
                            </Link>
                        </Grid.Column>  
                    </Grid.Row>
                </Grid> 
            </Layout>
        )
    }
}

export default CampaignShow;