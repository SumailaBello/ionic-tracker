
export interface AppSetting {
    isLoggedIn: boolean,
    batterySaver: boolean,
    defaultAccuracy: 'High' | 'Low',
}

export const initial_state : AppSetting = {
    isLoggedIn: false,
    batterySaver: false,
    defaultAccuracy: 'High',
}