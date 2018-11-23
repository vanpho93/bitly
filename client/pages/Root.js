import React, { Component } from 'react';
import { Grid, Container, Button } from 'semantic-ui-react';
import * as io from 'socket.io-client';
import { connect } from 'react-redux';
import { MyHead } from '../components/Head';
import { Link } from '../components/Link';
import Message from '../components/Message';
import * as actionCreators from '../redux/actions/actions';
import { SERVER_URL } from '../config';

class Root extends Component {
    state = { txtUrl: '' };

    componentDidMount() {
        const socket = io(SERVER_URL);
        socket.on('connection', () => console.log('connected'));
        socket.on('NEW_LINK_CREATED', link => {
            this.props.addNotification(link);
        });
    }

    addLink = () => {
        const { txtUrl } = this.state;
        this.props.addLink(txtUrl);
        this.setState({ txtUrl: '' });
    }

    render() {
        return (
            <Container style={{ marginTop: '10px' }}>
                <Grid columns='equal' centered>
                    <Grid.Column width={8}>
                        <div className='ui action input'>
                            <input
                                style={{ width: '300px' }}
                                placeholder='Paste your fluid link to shorten it'
                                value={this.state.txtUrl}
                                onChange={evt => this.setState({ txtUrl: evt.target.value })}
                            />
                            <Button loading={this.props.loading} onClick={this.addLink} disabled={!this.state.txtUrl.trim()}>
                                SHORTEN
                            </Button>
                        </div>
                        <div role='list' className='ui divided relaxed list'>
                            <MyHead />
                            {this.props.links.map(link => <Link key={link.code} link={link} />)}
                        </div>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        {this.props.notifications.map(link => <Message link={link} key={link.code} />)}
                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}

const mapState = state => ({ links: state.links, loading: state.loading, notifications: state.notifications });

export default connect(mapState, actionCreators)(Root);
