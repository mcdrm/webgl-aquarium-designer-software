import * as THREE from 'three'
import React, { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { useSelector } from 'react-redux';
import { MeshTransmissionMaterial, RenderTexture } from '@react-three/drei';

const GlassBox = () => {
    const { gl } = useThree();
    const { width, length, height, thickness } = useSelector((state) => state.aquariumCfg);

    const glassBoxSideShape = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo(-width / 2, -length / 2);
        model.lineTo(width / 2, -length / 2);
        model.lineTo(width / 2, length / 2);
        model.lineTo(-width / 2, length / 2);
        model.closePath()

        const hole = new THREE.Path();
        hole.moveTo(-(width / 2 - thickness), -(length / 2 - thickness));
        hole.lineTo((width / 2 - thickness), -(length / 2 - thickness));
        hole.lineTo((width / 2 - thickness), (length / 2 - thickness));
        hole.lineTo(-(width / 2 - thickness), (length / 2 - thickness));
        hole.closePath()

        model.holes.push(hole);
        
        return model;
    }, [width, length, thickness])

    const glassBoxBottomShape = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo(-width / 2, -length / 2);
        model.lineTo(width / 2, -length / 2);
        model.lineTo(width / 2, length / 2);
        model.lineTo(-width / 2, length / 2);
        model.closePath()

        return model;
    }, [width, length])
    
  const events = useThree((state) => state.events)
    return (
        <>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, thickness + 0.0001, 0]}>
                <extrudeGeometry args={[glassBoxSideShape, { depth: height - thickness, bevelEnabled: false }]} />
                {/* <meshPhysicalMaterial
                    color="lightblue"
                    transparent
                    opacity={0.2}
                    roughness={0.1}
                    metalness={0.3}
                    clearcoat={0.5}
                    clearcoatRoughness={0.1}
                    refractionRatio={0.5}
                    side={THREE.DoubleSide}
                /> */}
                <MeshTransmissionMaterial clearcoat={1} samples={2} resolution={1024} thickness={0.05} roughness={0} anisotropy={1} chromaticAberration={0} />
                {/* <MeshTransmissionMaterial clearcoat={1} samples={3} thickness={40} chromaticAberration={0.25} anisotropy={0.4} /> */}

            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <extrudeGeometry args={[glassBoxBottomShape, { depth: thickness, bevelEnabled: false }]} />
                <meshStandardMaterial color='#0066FF' />
            </mesh>
        </>
    )
}

export default GlassBox