
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from 'dayjs';

//intiailly used to obtain the values sepratly before using arraySlice.tsx
//only used to get the birthdate  because  the materialUI datepicker takes date type as DayJs

interface InitialState {
    email: string;
    name: string;
    password: string;
    birthdate: any;
    phonenumber: string;
    usertype: string;
    rating: number;

  }
const UpdateInputAction: string = "In";

const initialState: InitialState = {
  email: " ",
  name:" ",
  password: " ",
  birthdate: dayjs('2022-00-00T21:11:54'),
  phonenumber: " ",
  usertype: " ",
  rating: 0,
};

export const inputSlice = createSlice({
  name: UpdateInputAction,
  initialState: initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
        state.name = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setBirthdate: (state, action: PayloadAction<Dayjs>) => {
      state.birthdate = action.payload;
  },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
    state.phonenumber = action.payload;
  },
  setUsertype: (state, action: PayloadAction<string>) => {
      state.usertype = action.payload;
  },
  setRating: (state, action: PayloadAction<number>) => {
    state.rating = action.payload;
  },
  },
});


export const {setEmail,setName,setBirthdate,setPassword,setPhoneNumber,setRating,setUsertype } =
inputSlice.actions;

export default inputSlice.reducer;