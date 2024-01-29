import { GoogleMap } from '@capacitor/google-maps';
import { IonButton, IonIcon, IonImg, useIonToast } from '@ionic/react';
import React, { useEffect, useRef, useState } from 'react';
import { mapStyle } from '../../utils/mapStyle';
// import { addLocationWatcher, removeWatcher } from '../../utils/utils';
import {locate, locationOutline, location} from 'ionicons/icons';

interface MapProps {
    locationObj?: any,
    getAddress?: (lcoords: any)=> void,
}

let newMap: GoogleMap;

const MapComponent: React.FC<MapProps> = ({locationObj, getAddress}) => {

  const [presentToast, dismissToast] = useIonToast();

  const apiKey = import.meta.env.VITE_MAP_KEY;

  const mapRef = useRef<HTMLElement | null>(null);
//   let newMap: GoogleMap;
  useEffect(() => {
    // console.log('mounted')
    console.log('MAPREF', mapRef)
    // setTimeout(() => {
    //   initMap();
    // }, 1000);
  }, [])

  useEffect(() => {
    if(locationObj) {
        // updateMap()
       !newMap ? initMap() : updateMap();
    }
  }, [locationObj])
  
  const updateMap = ()=> {
    console.log('LOCATION EFFECT:', location )
    console.log('newMap', newMap)
    console.log('newMap', mapRef)
    setMarker(location);
    // newMap.
    // animateMapToRegion()
  }
  
  const animateMapToRegion = ()=> {
    newMap?.setCamera({
      coordinate: {
        lat: locationObj.latitude,
        lng: locationObj.longitude,
      },
      animate: true,
    })
  }

  const initMap = async ()=> {
    if (!mapRef) return;
    newMap = await GoogleMap.create({
      id: 'map', // Unique identifier for this map instance
      element: mapRef.current as HTMLElement, // reference to the capacitor-google-map element
      apiKey: apiKey, // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: locationObj?.latitude,
          lng: locationObj?.longitude,
        //   lat: 33.6,
        //   lng: -117.9,
        },
        zoom: 12, // The initial zoom level to be rendered by the map
        styles: mapStyle,
      },
    });
    // newMap.enableCurrentLocation(true);
    newMap.setOnBoundsChangedListener(mapBoundsChangeListener);
  }

  const mapBoundsChangeListener = (data: any)=> {
    console.log('Camera move', data);
    // mapRef.current.
    getAddress ? getAddress(data) : null;
  }

  // set current user location data
  const setMarker = async (locationObj: any)=> {
    try {
        await newMap?.addMarker({
            iconUrl: '../../assets/icon/location-pin.png',
            coordinate: {
                lat: locationObj.latitude,
                lng: locationObj.longitude,
            }
        })
    } 
    catch (err: any) {
        console.log(err)
        presentToast(err, 1000)
    }
    
  }

  return (
    <div className="component-wrapper" style={{ height: '100vh', width: '100vw' }}>
        <capacitor-google-map
            ref={mapRef}
            id="map" 
            style={{
                display: 'inline-block',
                width: window.innerWidth,
                height: window.innerHeight,
            }}
        >
        </capacitor-google-map>
        {/* move to location */}
        <div style={{position: 'absolute', zIndex: 3000, top: "60%", right: 10}}>
            <IonButton size="default"  className='ion-margin-start'
                onClick={animateMapToRegion}
                // onClick={()=> setRecenter(true)}
                slot='end' 
                color={'light'} fill='solid'>
                <IonIcon icon={locate} color='dark' />
            </IonButton>
        </div>
        <div>
            <IonIcon size='large' icon={location} color='danger'
                style={{position: 'absolute', zIndex: 3000, top: "46%", right: '46%'}} />
        </div>
    </div>
  );
};

export default MapComponent;