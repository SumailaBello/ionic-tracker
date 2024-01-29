import {BackgroundGeolocationPlugin} from "@capacitor-community/background-geolocation";
import { registerPlugin } from '@capacitor/core';

const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");
let watcherId: string;
let locationObj: any

// To start listening for changes in the device's location, add a new watcher.
// You do this by calling 'addWatcher' with an options object and a callback. A
// Promise is returned, which resolves to the callback ID used to remove the
// watcher in the future. The callback will be called every time a new location
// is available. Watchers can not be paused, only removed. Multiple watchers may
// exist simultaneously.
export const addLocationWatcher = async (callBackFn: any, errorCallBack: any)=> {
    BackgroundGeolocation.addWatcher(
        {
            // If the "backgroundMessage" option is defined, the watcher will
            // provide location updates whether the app is in the background or the
            // foreground. If it is not defined, location updates are only
            // guaranteed in the foreground. This is true on both platforms.
    
            // On Android, a notification must be shown to continue receiving
            // location updates in the background. This option specifies the text of
            // that notification.
            backgroundMessage: "Cancel to prevent battery drain.",
    
            // The title of the notification mentioned above. Defaults to "Using
            // your location".
            backgroundTitle: "Tracking You.",
    
            // Whether permissions should be requested from the user automatically,
            // if they are not already granted. Defaults to "true".
            requestPermissions: true,
    
            // If "true", stale locations may be delivered while the device
            // obtains a GPS fix. You are responsible for checking the "time"
            // property. If "false", locations are guaranteed to be up to date.
            // Defaults to "false".
            stale: false,
    
            // The minimum number of metres between subsequent locations. Defaults
            // to 0.
            distanceFilter: 50,
        }, 
        (location, error) => {
            callback(location, error, callBackFn, errorCallBack);
        }
    ).then(function after_the_watcher_has_been_added(watcher_id) {
        // When a watcher is no longer needed, it should be removed by calling
        // 'removeWatcher' with an object containing its ID.
        watcherId = watcher_id;
    }).finally(()=> {
        if(locationObj) return locationObj
        return null
    }
    )
}

const callback = (location: any, error: any, callBackFn: any, errorCallBack: any)=> {
    if (error) {
        if (error.code === "NOT_AUTHORIZED") {
            if (window.confirm(
                "This app needs your location, " +
                "but does not have permission.\n\n" +
                "Open settings now?"
            )) {
                // It can be useful to direct the user to their device's
                // settings when location permissions have been denied. The
                // plugin provides the 'openSettings' method to do exactly
                // this.
                BackgroundGeolocation.openSettings();
            }
        }
        console.error(error);
        errorCallBack(error);
        return error
    }
    console.log(location);
    callBackFn(location);
    return location

}

export const removeWatcher = ()=>{
    BackgroundGeolocation.removeWatcher({
        id: watcherId
    });
}
