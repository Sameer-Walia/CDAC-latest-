import { createSlice } from "@reduxjs/toolkit"

const istate = { isLoggedIn: false, name: "Guest", email: null, usertype: null, id: null, studentID: null, phone: null, batch: null, course: null }
const studentSlice = createSlice({
    name: "student",
    initialState: istate,
    reducers: {
        StudentLogin(state, action)
        {
            state.isLoggedIn = true
            state.name = action.payload.name
            state.email = action.payload.email
            state.usertype = action.payload.usertype
            state.id = action.payload._id
            state.studentID = action.payload.studentID
            state.phone = action.payload.phone
            state.batch = action.payload.batch
            state.course = action.payload.course
        },
        StudentLogOut(state, action)
        {
            state.isLoggedIn = false
            state.name = "Guest"
            state.email = null
            state.usertype = null
            state.id = null
            state.studentID = null
            state.phone = null
            state.batch = null
            state.course = null
        }
    }
})

export const { StudentLogin, StudentLogOut } = studentSlice.actions;
export default studentSlice.reducer