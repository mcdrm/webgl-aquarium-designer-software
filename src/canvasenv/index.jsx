import React from 'react'
import { OrbitControls, PerformanceMonitor } from '@react-three/drei'
import Environment from './environment'

const CanvasEnv = () => {
    return (
        <>
            <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
            <ambientLight intensity={0.5} />
            <Environment />
            <OrbitControls />
            <PerformanceMonitor />
            <axesHelper args={[50, 50, 50]} />
        </>
    )
}

export default CanvasEnv

