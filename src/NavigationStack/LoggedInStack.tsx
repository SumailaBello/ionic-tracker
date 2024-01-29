import React, { useEffect } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact, useIonRouter } from '@ionic/react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Settings from '../pages/Settings/Settings';

const LoggedInStack: React.FC = () => {
    const router = useIonRouter();

    useEffect(() => {
      router.push('/Home', 'root');
    }, [])
    
    return (
        <IonRouterOutlet>
            {/* <Route exact path="/" component={Home} /> */}
            <Route exact path="/Home" component={Home} />
            {/* //another way of doing it */}
            <Route exact path="/Settings" component={Settings} />
        </IonRouterOutlet>
    );
};

export default LoggedInStack;