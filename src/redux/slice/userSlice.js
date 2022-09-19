import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: 'Phan Anh Tuan',
    age: 22,
    gender: 'male',
  },
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload.name
      state.age = action.payload.age
      state.gender = action.payload.gender
    },
  },
})
export const { addUser } = userSlice.actions
export default userSlice.reducer
