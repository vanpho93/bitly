import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/actions/actions';
import { SERVER_URL } from '../config';

class Message extends Component {
    componentDidMount() {
        setTimeout(this.close, 5000);
    }

    close = () => {
        const { code }  = this.props.link;
        this.props.removeNotification(code)
    }

    render() {
        const { link } = this.props;
        if (!link) return null;
        const shortLink = `${SERVER_URL}/${link.code}`;
        return (
            <div className='ui info message fluid'>
                <i aria-hidden='true' className='close icon' onClick={this.close}/>
                <div className='content'>
                    <div className='header'>New link created</div>
                    <p>{link.url.substring(0, 50)}</p>
                    <p>{shortLink}</p>
                </div>
            </div>
        );
    }
}

export default connect(null, actionCreators)(Message);
