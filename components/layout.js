import React, { Component } from 'react';
import Header from './header';
import Head from 'next/head';
import {Container} from 'semantic-ui-react';

export default (props) => {
    return(
        <Container>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"></link>
            </Head>
             <Header/>
            {props.children}
        </Container>
    );
}
