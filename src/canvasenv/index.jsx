import React from 'react'
import { Environment, Lightformer, OrbitControls, PerformanceMonitor } from '@react-three/drei'
import { useSelector } from 'react-redux';

const CanvasEnv = () => {
    const { height, isCamAutoRotate } = useSelector((state) => state.aquariumCfg);

    return (
        <>
            <OrbitControls
                makeDefault
                target={[0, height / 2, 0]}
                maxPolarAngle={Math.PI / 2.1}
                enablePan={false}
                autoRotate={isCamAutoRotate}
            />
            <color attach="background" args={['#C6D7E5']} />

            <spotLight castShadow position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={2} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]}  intensity={0.5} shadow-bias={-0.0001} />
            <PerformanceMonitor />
            <axesHelper args={[50, 50, 50]} />

            {/** Custom environment map */}
            <Environment resolution={1024}>
                <group rotation={[-Math.PI / 3, 0, 0]}>
                <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
                    <Lightformer key={i} form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
                ))}
                <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
                <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
                </group>
            </Environment>
        </>
    )
}

export default CanvasEnv

