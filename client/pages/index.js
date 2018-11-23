import React from 'react'
import { connect } from 'react-redux'
import Root from './Root';
import { CookieService } from '../services/cookie.service';
import { uid } from '../services/uid.service';
import { getLinks } from '../redux/actions/actions';

class Index extends React.Component {
    static async getInitialProps(ctx) {
        CookieService.setContext(ctx);
        const { reduxStore } = ctx;
        const { creatorId } = CookieService.parseCookies();
        if (!creatorId) CookieService.setCookie('creatorId', uid(10));
        await reduxStore.dispatch(getLinks());
        return {};
    }

    render() {
        return (
            <Root />
        )
    }
}

export default connect(null)(Index)
