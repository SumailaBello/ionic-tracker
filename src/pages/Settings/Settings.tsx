import { IonBackButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonNote, IonPage, IonSelect, IonSelectOption, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import React from 'react';
import { StatusBar } from '@capacitor/status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@capacitor/app';
import { toggleBatterySaver, toggleAccuracy } from '../../store/appSettings';
import { RootState } from '../../store/store';
import { Preferences } from '@capacitor/preferences';

const Settings: React.FC = () => {
    //GLOBAL STATE
    const {batterySaver, defaultAccuracy} = useSelector((state: RootState)=> state.appSetting);
    const dispatch = useDispatch();
    console.log(defaultAccuracy)
    StatusBar.setBackgroundColor({
        color: '#00916E'
    })

    // handle batter saver change settings
    const handleBatterySaverChange = async (evt: any)=> {
        console.log(evt);
        dispatch(toggleBatterySaver(evt.detail.checked));
        await Preferences.set({key: 'batterySaver', value: String(evt.detail.checked)});
    }

    // handle change in accuracy
    const handleAccChange = async (evt: any)=> {
        console.log(evt);
        dispatch(toggleAccuracy(evt.detail.value as 'High' | 'Low'));
        await Preferences.set({key: 'accuracy', value: String(evt.detail.value)});
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar className='ion-no-border' color={'primary'}>
                    <IonButtons slot='start' className='ion-margin-start'>
                        <IonBackButton defaultHref='/' color={'light'} text={''}></IonBackButton>
                    </IonButtons>
                    <IonTitle color={'light'}>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonItem className='ion-margin-top'>
                    <IonSelect value={defaultAccuracy} onIonChange={handleAccChange} interface='action-sheet' label='Default Accuracy' labelPlacement='floating'>
                        <IonSelectOption value={'High'}>High</IonSelectOption> 
                        <IonSelectOption value={'Low'}>Low</IonSelectOption> 
                    </IonSelect>
                </IonItem>
                <IonItem className='ion-margin-top'>
                    <IonLabel>Battery Saver</IonLabel>
                    <IonToggle onIonChange={handleBatterySaverChange} checked={batterySaver} />
                    <IonNote>
                        <small>Saves battery by reducing request frequency</small>
                    </IonNote>
                </IonItem>
            </IonContent>
        </IonPage>
    );
};

export default Settings;