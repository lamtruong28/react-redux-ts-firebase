import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"; 
import { database } from '../../firebase/config';
import { DataType, StudentType } from '../../interface';
import { convertDateToDMY } from '../../utils';

type StudentState = {
    listStudent: DataType[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    isEdit: boolean,
    editStudent: DataType,
}

type PayloadType = {
    id: string,
    payload: StudentType
}
  
const initialState = {
    listStudent: [],
    loading: 'idle',
    isEdit: false,
    editStudent: {
        id: "",
        fullName: "",
        dayOfBirth: "",
        gender: "Nam",
        address: ""
    }
} as StudentState

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setEditStudent: (state, action) => {
            state.isEdit = true;
            state.editStudent = action.payload
        },
        setIsEdit: (state, action)=>{
            state.isEdit = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllStudent.pending, (state)=>{
            state.loading = 'pending';
        })
        .addCase(fetchAllStudent.fulfilled, (state, action)=>{
            state.loading = 'succeeded';
            state.listStudent = action.payload;
        })
        .addCase(updateStudent.fulfilled, (state)=>{
            state.isEdit = false;
            state.editStudent = {
                id: "",
                fullName: "",
                dayOfBirth: "",
                gender: "Nam",
                address: ""
            }
        })
        .addCase(removeStudent.fulfilled, (state)=> {
            state.isEdit = false;
            state.editStudent = {
                id: "",
                fullName: "",
                dayOfBirth: "",
                gender: "Nam",
                address: ""
            }
        })
    }
})

export const fetchAllStudent = createAsyncThunk('fetchAllStudent', async ()=> {
    const querySnapshot = await getDocs(collection(database, "students"));
    let data:DataType[] = [];
    querySnapshot.forEach((doc) => {
    data.push({...doc.data(), id: doc.id}as DataType);
 })
    return data;
})

export const addStudent = createAsyncThunk('addStudent', async (payload:StudentType)=> {
    try {
        payload['dayOfBirth'] = convertDateToDMY(payload.dayOfBirth);
        await addDoc(collection(database, "students"), {...payload});
    } catch (err) {
        console.error("Error adding document: ", err);
    }
})

export const removeStudent = createAsyncThunk('removeStudent', async (id:string) => {
    await deleteDoc(doc(database, "students", id));
})

export const updateStudent = createAsyncThunk('updateStudent', async ({id, payload}:PayloadType)=>{
    payload['dayOfBirth'] = convertDateToDMY(payload.dayOfBirth);
    const washingtonRef = doc(database, "students", id);
    await updateDoc(washingtonRef, {...payload})
})

export default studentSlice;