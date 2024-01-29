import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { initial_state } from '../utils/constant';
// import { AppSettings} from '../utils/types';

const initialState = initial_state;

export const appSettingSlice = createSlice({
  name: 'appSettings',
  initialState,
  reducers: {
    /** determines whtether user is logged in or not */
    toggleLoggedIn: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isLoggedIn = !state.isLoggedIn;
    },

    toggleBatterySaver: (state, action: PayloadAction<boolean>) => {
      state.batterySaver = action.payload;
    },

    toggleAccuracy: (state, action: PayloadAction<'High' | 'Low'>) => {
      console.log('FROM STATE', action.payload)
      state.defaultAccuracy = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { 
  toggleLoggedIn,
  toggleBatterySaver,
  toggleAccuracy,
} = appSettingSlice.actions

export default appSettingSlice.reducer