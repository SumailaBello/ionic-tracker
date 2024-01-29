import { Link, Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { RootState } from './store/store';
import LoggedOutStack from './NavigationStack/LoggedOutStack';
import LoggedInStack from './NavigationStack/LoggedInStack';
import { StatusBar } from '@capacitor/status-bar';
import { Preferences } from '@capacitor/preferences';
import { toggleAccuracy, toggleBatterySaver } from './store/appSettings';

setupIonicReact({
  mode: 'ios'
});

const App: React.FC = () => {
  //GLOBAL STATE
  const {isLoggedIn} = useSelector((state: RootState) => state.appSetting);
  const dispatch = useDispatch();

  useEffect(() => {
    checkBatteryPreference();
    checkAccuracyPreference();
  }, [])
  

  // Add or remove the "dark" class on the document body
  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle('dark', shouldAdd);
  };

  const checkBatteryPreference = async () => {
    const { value } = await Preferences.get({ key: 'batterySaver' });
    const finalVal = value === 'true' ? true : false;
    dispatch(toggleBatterySaver(finalVal));
  };

  const checkAccuracyPreference = async () => {
    const { value } = await Preferences.get({ key: 'accuracy' });
    dispatch(toggleAccuracy(value as 'High' | 'Low' ?? 'High'));
  };

  // useEffect(() => {
  //   // Use matchMedia to check the user preference
  //   const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  //   toggleDarkTheme(prefersDark.matches);

  //   // Listen for changes to the prefers-color-scheme media query
  //   prefersDark.addEventListener('change', (mediaQuery) => toggleDarkTheme(mediaQuery.matches));
  // }, []);

  return (
    <IonApp>
      <IonReactRouter>
        {isLoggedIn ? (
          <LoggedInStack />
        ) : (
          <LoggedOutStack />
        )}
      </IonReactRouter>
    </IonApp>
  )
};

export default App;
