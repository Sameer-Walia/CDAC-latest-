import { createSlice } from "@reduxjs/toolkit"

const istate = { isLoggedIn: false, name: "Guest", email: null, usertype: null, id: null }
const teacherslice = createSlice({
    name: "teacher",
    initialState: istate,
    reducers: {
        TeacherLogin(state, action)
        {
            state.isLoggedIn = true
            state.name = action.payload.name
            state.email = action.payload.email
            state.usertype = action.payload.usertype
            state.id = action.payload._id
        },
        TeacherLogOut(state, action)
        {
            state.isLoggedIn = false
            state.name = "Guest"
            state.email = null
            state.usertype = null
            state.id = null
        }
    }
})

export const { TeacherLogin, TeacherLogOut } = teacherslice.actions;
export default teacherslice.reducer