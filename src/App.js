import { Canvas } from '@react-three/fiber'
import { Fragment } from 'react'

import Component from './component'
import ControlPanel from './controlpanel'
import CanvasEnv from './canvasenv'

export function App() {
    return (
        <Fragment>
            <ControlPanel />
            <Canvas shadows camera={{ position: [5, 0, 15], fov: 30 }}>
                <CanvasEnv />
                <Component />
            </Canvas>
        </Fragment>
    )
}

