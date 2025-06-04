import { configureStore } from '@reduxjs/toolkit';
import aquariumConfigSlice from '../features/aquariumConfigSlice';
import textureConfigSlice from '../features/textureConfigSlice';
import glbConfigSlice from '../features/glbConfigSlice';

const store = configureStore({
    reducer: {
        aquariumCfg: aquariumConfigSlice,
        textureCfg: textureConfigSlice,
        glbCfg: glbConfigSlice,
    }
})

export default store;