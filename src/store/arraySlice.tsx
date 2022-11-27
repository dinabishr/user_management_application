
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//initalstate used
const initialState ={
  users:[
  {id:0,email: "dina@gmail", name: "dina",pass:"123" ,birthdate:'11/30/2000' ,phone: "012333" ,userT: "admin" ,rate: 3,},
  {id:1,email: "maha@yahoo", name: "maha" ,pass:"123",birthdate:'11/30/2021' ,phone: "012333" ,userT: "normal",rate:2,}
  ]}


  

//define all the action.payloads for the reducers
//define what each reducer will do
const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: { addUser: (state, action: PayloadAction<{email:string,name:string ,pass:string,birthdate:any,phone:string,userT:string,rate:number}>) => {
    state.users = [
      ...state.users,
      {
        id: state.users[state.users.length-1].id+1,
        email: action.payload.email,
        name: action.payload.name,
        pass: action.payload.pass,
        birthdate: action.payload.birthdate,
        phone:action.payload.phone,
        userT: action.payload.userT,
        rate: action.payload.rate,
      },
    ];
  },
  removeUser: (state, action: PayloadAction<any>) => {
    state.users = state.users.filter(({ id }) => id !== action.payload);
  },
},
})


export const {addUser,removeUser} = usersSlice.actions;

export default usersSlice.reducer