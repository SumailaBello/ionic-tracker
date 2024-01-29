import React, { useEffect } from 'react';
import { IonApp, IonRouterOutlet, useIonRouter, useIonViewDidEnter } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Onboarding from '../pages/Auth/Onboarding/Onboarding';
import Login from '../pages/Auth/Login/Login';
import Register from '../pages/Auth/Register/Register';
import { IonReactRouter } from '@ionic/react-router';

const LoggedOutStack: React.FC = () => {
    const router = useIonRouter();

    useIonViewDidEnter(()=> {
        router.push('/Onboarding', 'root');
    })
    
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/">
                    <Onboarding />
                </Route>
                <Route exact path="/Onboarding">
                    <Onboarding />
                </Route>
                {/* //another way of doing it */}
                <Route exact path="/Login" component={Login} />
                <Route exact path="/Register" component={Register} />
                {/* <Route exact path="/Home" component={Home} /> */}
            </IonRouterOutlet>
        </IonReactRouter>
    );
};

export default LoggedOutStack;