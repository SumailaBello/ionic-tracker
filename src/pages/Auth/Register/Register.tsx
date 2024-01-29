import { IonCard, IonCardContent, IonContent, IonRow, IonCol, IonText, useIonRouter, IonFooter, IonIcon, IonButtons, IonButton, IonBackButton, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
// import {chevronBack} from 'ionicons/icons'

const Register: React.FC = () => {
    const router = useIonRouter();

    const doLogin = (event: any) => {
        event.preventDefault();
        console.log('doLogin');
    }
    return (
        <IonPage>
            <IonHeader className='ion-no-border'>
                <IonToolbar color={'light'}>
                    <IonButtons slot='start' className='ion-margin-start'>
                        <IonButton onClick={()=> router.goBack()}>
                            {/* <IonIcon icon={chevronBack} size='large' /> */}
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
                            <h3>Login to proceed</h3>
                        </IonText>
                        <form onSubmit={doLogin}>
                            <IonInput label='Email' placeholder='example@mail.com' labelPlacement='floating'></IonInput>
                            <hr style={{backgroundColor: '#989aa2'}} />
                            <IonInput label='Password' fill='outline' labelPlacement='floating' color={'success'}></IonInput>
                            <hr style={{backgroundColor: '#989aa2'}} />
                            <div className='ion-margin-top' />
                            <IonText color={'danger'} className='ion-margin-top'>
                                Forgot Password?
                            </IonText>
                        </form>
                    </IonCardContent>
                </IonCard>
                </div>
            </IonContent>
            <IonFooter className='ion-no-border'>
                <IonToolbar color={'light'}>
                    <IonButton expand='block' color={'primary'} className='ion-margin' onClick={()=>router.push('Login')}>
                        <IonText color={'light'}>Login</IonText>
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Register;