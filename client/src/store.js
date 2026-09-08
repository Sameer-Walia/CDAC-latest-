import { configureStore } from '@reduxjs/toolkit'
import teacherslice from './reduxslices/teacherSlice'
import studentSlice from './reduxslices/studentSlice'

const store = configureStore({
    reducer: {
        teacher: teacherslice,
        student: studentSlice
    }
})

export default store

