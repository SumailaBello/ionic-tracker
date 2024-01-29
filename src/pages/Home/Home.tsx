import { IonModal, IonButton, IonContent, IonIcon, IonPage, IonItem, IonLabel, IonSelect, IonSelectOption, useIonRouter, useIonViewWillLeave, useIonViewWillEnter, useIonToast, IonText, IonCard, IonCardContent, useIonAlert } from '@ionic/react';
import './Home.css';
import { useEffect, useRef, useState } from 'react';
import MapComponent from '../../components/MapComponent/MapComponent';
import { NativeGeocoder } from '@capgo/nativegeocoder';
import { Geolocation } from '@capacitor/geolocation';
import {locationOutline, batteryHalfOutline, play, stop, settings, locate} from 'ionicons/icons'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleAccuracy } from '../../store/appSettings';
import { Preferences } from '@capacitor/preferences';
import { Device, DeviceInfo } from '@capacitor/device';

// const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");

const Home: React.FC = () => {
  //GLOBAL STATE
  const {batterySaver, defaultAccuracy} = useSelector((state: RootState)=> state.appSetting);
  const dispatch = useDispatch();
  //HOOKS
  const modalRef = useRef<HTMLIonModalElement | null>(null);
  // const newMap = useRef<GoogleMap | null>(null);

  // IONIC HOOKS
  const [presentAlert, dismissAlert] = useIonAlert();
  const [presentToast, dismissToast] = useIonToast();
  const router = useIonRouter();

  //LOCAL STATE
  const [tracking, setTracking] = useState(true);
  const [location, setLocation] = useState<any>(null);
  const [recenter, setRecenter] = useState<boolean>(false);
  const [address, setAddress] = useState<any>("Loading...");
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);


  useIonViewWillLeave(()=> {
    modalRef.current?.dismiss();
  })
  useIonViewWillEnter(()=> {
    modalRef.current?.present();
  })

  //get device info
  const getDeviceInfo = async () => {
    const info = await Device.getInfo();
    console.log(info);
    setDeviceInfo(info)
  };

  let watchId = useRef<any>();
  useEffect(() => {
    modalRef.current?.present();
    startWatchPosition();
    getDeviceInfo();
    return ()=> {
      Geolocation.clearWatch({
        id: watchId.current,
      })}
  }, [])
  

  const startWatchPosition = async ()=> {
    try {
      watchId.current = await Geolocation.watchPosition({
        enableHighAccuracy: defaultAccuracy === 'High' ? true : false,
        timeout: batterySaver ? 20000 : 5000,
      }, handleWatch)
    } 
    catch (err) {
      console.log(err)
      alert('error')
    }
  }

  const handleWatch = async (position: any, err: any)=> {
    console.log(position);
    setLocation(position.coords);
    getAddress(position.coords);
    // return watchId;
  }

  const getAddress = async (coords: any)=> {
    // alert('Get address')
    setAddress('Loading...');
    try {
      const res = await NativeGeocoder.reverseGeocode({
        latitude: coords.latitude,
        longitude: coords.longitude,
        useLocale: true,
        defaultLocale: 'en_NG',
      })
      console.log('ADDRESS:', res);
      setAddress(res.addresses[0]);
    } 
    catch (err) {
      console.log(err);
      presentToast('Unable to get address for given location', 1000);

    }
    
  }

  const toggleMode = async ()=> {
    if(tracking) {
      try {
        const res = await Geolocation.clearWatch({id: watchId.current});
        console.log(res);
        presentAlert('Tracking stopped')
      } 
      catch (err) {
        console.log(err)
        presentAlert('Unable to stop tracking')
      }
      setTracking(false);
    }
    else {
      startWatchPosition();
      setTracking(true);
    }
  }

  // handle change in accuracy
  const handleAccChange = async (evt: any)=> {
    console.log(evt);
    dispatch(toggleAccuracy(evt.detail.value as 'High' | 'Low'));
    await Preferences.set({key: 'accuracy', value: String(evt.detail.value)});
  }

  return (
    <IonPage>
      <MapComponent locationObj={location} getAddress={getAddress}
      />
      <div style={{position:'absolute', zIndex: 2000, width: '95vw', left: 10, right: 10, top: deviceInfo?.platform === 'ios' ? 30 : 0}}>
        <IonCard>
          <IonCardContent className='ion-no-padding'>
            <IonItem lines="none">
              <IonIcon slot='start' size='small' icon={locationOutline} color={'primary'} />
              <IonLabel color={'dark'}>
                {address?.thoroughfare ?? address ?? 'Not Found'} <br />
                <small color='medium'>{address.locality}</small>
              </IonLabel>
            </IonItem>  
          </IonCardContent>
        </IonCard>
      </div>
      <IonContent color={'light'}>
        <IonModal backdropBreakpoint={0.3} showBackdrop={false} ref={modalRef} handle={false} initialBreakpoint={0.3} breakpoints={[0.4]} >
          <div style={{marginTop: '5px'}}>
            <IonItem lines='none'>
              <IonLabel slot='start' >
                <IonButton size="default" fill='outline'
                  onClick={toggleMode}
                  color={tracking ? 'danger' : 'primary'}
                >
                  <IonIcon icon={ tracking ? stop : play} />
                </IonButton> <br />
                <IonText className='ion-text-capitalize ion-text-center'>
                  <small>{tracking ? 'stop tracking' : 'resume tracking'}</small>
                </IonText>
              </IonLabel>
              <IonButton size="default" slot='end' 
                onClick={()=> {
                  router.push('Settings');
                }}
                color={'medium'} fill='outline'>
                <IonIcon icon={settings} color='dark' mode='md' />
              </IonButton>
            </IonItem> 
            <IonItem className='ion-margin-top'>
              <IonSelect onIonChange={handleAccChange} value={defaultAccuracy} interface='action-sheet' label='Accuracy' labelPlacement='floating' >
                <IonSelectOption value={'High'}>High</IonSelectOption> 
                <IonSelectOption value={'Low'}>Low</IonSelectOption> 
              </IonSelect>
            </IonItem>
            <IonItem className='ion-margin-top' >
              <IonIcon color='primary' icon={batteryHalfOutline} slot='start' />
              <IonLabel>
                {batterySaver ? 'Battery Saver is on' : 'Battery saver is off' }
              </IonLabel>
            </IonItem>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
