import { IonCard, IonCardContent, IonContent, IonRow, IonCol, IonText, useIonRouter, IonFooter, IonIcon, IonButtons, IonButton, IonBackButton, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, {LegacyRef, useRef} from 'react';
import {chevronBack} from 'ionicons/icons'
import { useDispatch } from 'react-redux';
import { toggleLoggedIn } from '../../../store/appSettings';
import { StatusBar } from '@capacitor/status-bar';

const Login: React.FC = () => {
    //GLOBAL STATE
    const dispatch = useDispatch();
    const router = useIonRouter();
    const formRef: LegacyRef<HTMLFormElement | any>= useRef();

    const doLogin = (event: any) => {
        // event.preventDefault();
        // alert('alert')
        dispatch(toggleLoggedIn());
        // router.push('Home')
        console.log('doLogin');
        console.log(formRef);
    }
    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar color={'light'}>
                    <IonButtons slot='start' className='ion-margin-start'>
                        <IonButton onClick={()=> router.goBack()}>
                            <IonIcon icon={chevronBack} size='large' />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Login</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding" color={'light'}>
                <div style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <IonCard style={{width: '100vw'}}>
                    <IonCardContent>
                        <IonText>
                            <h3>Login to proceed!!!</h3>
                        </IonText>
                        <form onSubmit={doLogin} ref={formRef}>
                            <IonInput label='Email' placeholder='example@mail.com' labelPlacement='floating'></IonInput>
                            <hr style={{backgroundColor: '#989aa2'}} />
                            <IonInput label='Password' fill='outline' labelPlacement='floating' color={'success'}></IonInput>
                            <hr style={{backgroundColor: '#989aa2'}} />
                            <div className='ion-margin-top' />
                            <IonText color={'danger'} className='ion-margin-top'>
                                Forgot Password?
                            </IonText>
                        </form>
                        {/* <button>link</button> */}
                    </IonCardContent>
                </IonCard>
                </div>
            </IonContent>
            <IonFooter className='ion-no-border'>
                <IonToolbar color={'light'}>
                    <IonButton expand='block' color={'primary'} className='ion-margin' onClick={doLogin}>
                        <IonText color={'light'}>Login</IonText>
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Login;