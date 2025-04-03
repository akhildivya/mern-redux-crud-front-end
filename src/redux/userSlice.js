import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: []
    },
    reducers: {
        getUser: (state, action) => {

            state.users = action.payload


        },
        addUser: (state, action) => {
            state.users.push(action.payload)
        },
        modifyUser: (state, action) => {

            const index = state.users.findIndex(x => x.id == action.payload.id)
            state.users[index] = {
                id: action.payload.id,
                name: action.payload.name,
                email: action.payload.email,
                age: action.payload.age,
            }
        },
        deleteUser: (state, action) => {
            const id = action.payload.id
            state.users = state.users.filter(u => u.id == id)
        }
    }
})
export const { getUser, addUser, modifyUser, deleteUser } = userSlice.actions
export default userSlice.reducer