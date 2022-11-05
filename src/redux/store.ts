import { configureStore } from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'
import studentSlice from './slices/studentSlice'

const store = configureStore({
    reducer: {
        students: studentSlice.reducer
    }
})
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type StoreState = ReturnType<typeof store.getState>
export default store;