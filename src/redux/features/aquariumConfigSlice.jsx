import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    width: 5,
    length: 4,
    height: 3,
    thickness: 1,
}

export const aquariumConfigSlice = createSlice ({
    name: 'aquariumConfig',
    initialState,
    reducers: {
        setInitAquariumSize: (state, action) => {
            state.width = action.payload.width;
            state.length = action.payload.length;
            state.height = action.payload.height;
            state.thickness = action.payload.thickness
        },
        setAquariumSize: (state, action) => {
            state[Object.keys(action.payload)[0]] = action.payload[Object.keys(action.payload)[0]]
        }
    }
})

export const { setInitAquariumSize, setAquariumSize } = aquariumConfigSlice.actions

export default aquariumConfigSlice.reducer;