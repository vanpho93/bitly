import React from 'react';
import { Label, Icon, Divider } from 'semantic-ui-react';
import { SERVER_URL } from '../config';

export const Link = ({ link }) => {
    const shortLink = `${SERVER_URL}/${link.code}`;
    return (
        <div role='listitem' className='item'>
            <div className='content'>
                <a
                    className='header'
                    style={{ marginTop: '10px', marginBottom: '10px', color: '#999999' }}
                    href={shortLink}
                >{link.title}</a>
                <a style={{ color: '#A6A6A6' }}>{link.url.substring(0, 70)}</a>
                <div className='ui hidden divider' />
                <a href={shortLink} style={{ color: 'orange', fontWeight: 'bolder' }}>{shortLink}</a>
                <Divider horizontal />
                <Label>
                    <Icon name='chart bar' />{link.clickCount}
                </Label>
            </div>
        </div>
    );
};
