import React from 'react'
import { Environment, OrbitControls, PerformanceMonitor, useEnvironment } from '@react-three/drei'

const CanvasEnv = () => {
  const env = useEnvironment({ files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr' })

    return (
        <>
            <OrbitControls />

            <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} castShadow intensity={2} shadow-bias={-0.0001} />
            <ambientLight intensity={0.5} />
            <Environment map={env} background blur={1} />
            <PerformanceMonitor />
            <axesHelper args={[50, 50, 50]} />
        </>
    )
}

export default CanvasEnv

