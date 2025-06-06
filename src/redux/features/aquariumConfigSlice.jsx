import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    width: 0,
    length: 0,
    height: 0,
    thickness: 0,
    isCamAutoRotate: false,
    isShowGrass: false,
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
        },
        setIsCamAutoRotate: state => {
            state.isCamAutoRotate = !state.isCamAutoRotate;
        },
        setIsShowGrass: (state, action) => {
            state.isShowGrass = !state.isShowGrass;
        },
    }
})

export const { setInitAquariumSize, setAquariumSize, setIsCamAutoRotate, setIsShowGrass } = aquariumConfigSlice.actions

export default aquariumConfigSlice.reducer;