import React from 'react'
import { Environment, OrbitControls, PerformanceMonitor, useEnvironment } from '@react-three/drei'
import { useSelector } from 'react-redux';
import { DirectionalLight } from 'three';

const CanvasEnv = () => {
    const height = useSelector((state) => state.aquariumCfg.height);
    const env = useEnvironment({ files: '/assets/env/peppermint_powerplant_2_1k.hdr' })

    return (
        <>
            <OrbitControls
                target={[0, height / 2, 0]}
                maxPolarAngle={Math.PI / 2.1}
                enablePan={false}
            />

            <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} castShadow intensity={0.5} shadow-bias={-0.0001} />
            <Environment map={env} background blur={0.5} />
            <PerformanceMonitor />
            <axesHelper args={[50, 50, 50]} />
        </>
    )
}

export default CanvasEnv

