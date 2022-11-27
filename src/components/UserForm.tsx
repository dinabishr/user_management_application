import React, { useCallback, useRef ,useState} from 'react'
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { DataGrid  ,GridRowId ,GridColumns,GridActionsCellItem} from '@mui/x-data-grid';
import { RootState,selectUsers } from "../store/store";
import {useDispatch, useSelector } from "react-redux";
import { setBirthdate } from '../store/inputSlice';
import { addUser,removeUser } from '../store/arraySlice';

//for the drop down menu of usertypes options (admin/mod/normal)
const userTypes = [
  {
    value: 'admin',
    label: 'admin',
  },
  {
    value: 'normal',
    label: 'normal',
  },
  {
    value: 'mod',
    label: 'mod',
  },
];


const UserForm = () => {
  //use selector to allow re-rendering if the selector result is different from the last result
  const bd: any = useSelector(
    (state: RootState) => state.input.birthdate
  );
  const users = useSelector(selectUsers);

  type Row = typeof users[number];

  //use dispatch hook
  const dispatch = useDispatch();

  //delete user disptahc function removes user based on the id obtained from the DataGrid
  const ondeleteUser = React.useCallback(
    (id: GridRowId) => () => {
        dispatch(removeUser(id))
      }, [dispatch]);

  const columns = React.useMemo<GridColumns<Row>>(
    () => [
    {field: 'id', headerName: 'id',width: 50, editable: true,type:'number',},
      {field: 'email', headerName: 'Email',width: 140, editable: true,},
      {field: 'name',headerName: 'Name',width: 100, editable: true,},
      {field: 'pass',headerName: 'Password',width: 100, editable: true,},
      {field: 'birthdate',headerName: 'BirthDate',width: 120, editable: true,},
      {field: 'phone',headerName: 'PhoneNumber',width: 110, editable: true,},
      {field: 'userT',headerName: 'UserType',width: 100, editable: true,},
      {field: 'rate',headerName: 'Rating',width: 80, editable: true,type:'number',},
      {field: 'actions',type: 'actions', width: 50,
      getActions: (params) => [
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={ondeleteUser(params.id)}/>,
      ],
    },
  ],
  [ondeleteUser],
);

//references for all input fields in order to be able to obtain their values 
  const newEmailRef = useRef<HTMLInputElement>(null);
  const newNameRef = useRef<HTMLInputElement>(null);
  const newPassRef = useRef<HTMLInputElement>(null);
  const newBirthDateRef = useRef<HTMLInputElement>(null);
  const newPhoneRef = useRef<HTMLInputElement>(null);
  const newUserTRef = useRef<HTMLInputElement>(null);
  const newRateTRef = useRef<HTMLInputElement>(null);

  //dispatch function to use addUser() , all payloads actions are given as ref.current.value
  //if condition is to make sure that the value is not NULL or it will fail to add 
  const onAddUser = useCallback(() => {
    if(newEmailRef && newEmailRef.current && newNameRef && newNameRef.current && newPassRef && newPassRef.current
    &&newBirthDateRef && newBirthDateRef.current&& newPhoneRef && newPhoneRef.current
       &&newUserTRef && newUserTRef.current && newRateTRef && newRateTRef.current){
      dispatch(addUser({email:newEmailRef.current.value,name:newNameRef.current.value ,pass:newPassRef.current.value
        ,birthdate:newBirthDateRef.current.value,phone:newPhoneRef.current.value,userT:newUserTRef.current.value
        ,rate:parseInt(newRateTRef.current.value)}));
        
    }

  }, [dispatch]);


  console.log(users)


    return (
    <div style={{display:"flex" }}>
    <div style={{width:300 ,margin:1}}>
      {/* textfields to obatin the required user data */}
      <Stack spacing={3}>
        <TextField inputRef={newEmailRef} label="Email"  id="outlined-basic"  color="secondary" variant="outlined" />
        <TextField inputRef={newNameRef} label="Name"  id="outlined-basic" color="secondary" variant="outlined"/>
        <TextField inputRef={newPassRef} label="Password"  id="outlined-basic" color="secondary" variant="outlined"/>
        <TextField inputRef={newPhoneRef} label="PhoneNumber"  id="outlined-basic" color="secondary" variant="outlined"/>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            inputRef={newBirthDateRef}
            label="BirthDate"
            inputFormat="MM/DD/YYYY"
            value={bd}
            onChange = {(newVal: Dayjs | null) => {
              dispatch(setBirthdate(dayjs(newVal)));
            }}
            renderInput={(params) => <TextField {...params}   color="secondary"/>}
          />
        </LocalizationProvider>
        <TextField
         inputRef={newUserTRef} 
          id="outlined-select"
          select
          label="UserType"
          color="secondary" 
        >
          {userTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField inputRef={newRateTRef} label="Rating"  id="outlined-basic" color="secondary" variant="outlined" />
        <button  onClick={onAddUser}>Add User</button>
      </Stack>
      </div>
      <div style={{width:850 ,height : 400 ,margin:5}} >
        
        {/* grid that shows the updated users list  */}
        <DataGrid rows={users} columns={columns} />

      </div>
    </div>
    )
  }
  
  export default UserForm


