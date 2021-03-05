import React, {Component} from 'react';
import factory from '../ethereum/factory';
import {Card, Button} from 'semantic-ui-react';
import Layout from '../components/layout';
import {Link} from '../routes';

class Index extends Component{
    static async getInitialProps(){
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return {campaigns};
    }

    renderCampaigns(){
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: 
                    (<Link route={`/campaigns/${address}`}>
                    <a>View Campaign</a>
                    </Link>
                    ),
                fluid: true
            }
        });

        return <Card.Group items={items} />;
    }

    render(){
        return(
            <Layout>
            <div>
                <h3>Active Campaigns</h3>
                <Link route="campaigns/new">
                <a>
                <Button
                    floated="right"
                    content="Create New Campaign"
                    icon="add circle"
                    primary
                />
                </a></Link>
                
                {this.renderCampaigns()}
            </div>
            </Layout>
        )
    }
}

export default Index;
