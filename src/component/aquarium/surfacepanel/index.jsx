import React from 'react';
import { RoundedBox } from '@react-three/drei';
import { useSelector } from 'react-redux';

const SurfacePanel = () => {
    const { width, length } = useSelector((state) => state.aquariumCfg);

    return (
        <group>
            <mesh castShadow receiveShadow position={[0, -0.05, 0]}>
                <RoundedBox 
                    castShadow
                    receiveShadow
                    args={[width * 1.5, 0.1, length * 1.5]}
                    radius={0.05}
                    smoothness={4}
                >
                    <meshStandardMaterial color='#8c8c8c' roughness={0.1} metalness={0.3} />
                </RoundedBox>
            </mesh>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.15, 0]}>
                <planeGeometry args={[width * 1.5, length * 1.5]} />
                <meshBasicMaterial color='#A6BDD4' />
            </mesh>
        </group>
    );
}

export default SurfacePanel;