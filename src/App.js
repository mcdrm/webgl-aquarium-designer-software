import { Canvas } from '@react-three/fiber'
import { Fragment } from 'react'

import Component from './component'
import ControlPanel from './controlpanel'
import CanvasEnv from './canvasenv'
import { useSelector } from 'react-redux'

export function App() {
    const height = useSelector((state) => state.aquariumCfg.height);

    return (
        <Fragment>
            <ControlPanel />
            <Canvas shadows camera={{ position: [5, height * 2, 15], fov: 30 }}>
                <CanvasEnv />
                <Component />
            </Canvas>
        </Fragment>
    )
}

