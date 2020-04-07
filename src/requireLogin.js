import React from 'react';
import LoginContext from './LoginContext'
import { Redirect } from 'react-router'

//HOC
const requiresLogin = loginUrl =>
    Component => props =>
    <LoginContext.Consumer>
        {
            ({logged}) =>
                logged
                    ?   <Component {...props} />
                    :   <Redirect to={loginUrl} />
        }
    </LoginContext.Consumer>

export default requiresLogin