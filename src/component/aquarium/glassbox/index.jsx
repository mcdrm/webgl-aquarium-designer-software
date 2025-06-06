import * as THREE from 'three'
import React, { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { useSelector } from 'react-redux';
import { MeshTransmissionMaterial } from '@react-three/drei';

const GlassBox = () => {
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

    const pillarShape = useMemo(() => {
        const model = new THREE.Shape();
        model.moveTo(0, 0);
        model.lineTo(-thickness / 2, 0)
        model.lineTo(-thickness / 2, thickness / 10)
        model.lineTo(thickness / 10, thickness / 10)
        model.lineTo(thickness / 10, - thickness / 2)
        model.lineTo(0, - thickness / 2)
        model.closePath();

        return model;
    }, [thickness])    

    const baseCircleShape = new THREE.Shape();
    baseCircleShape.absarc(0, 0, Math.max(width, length), 0, Math.PI * 2, false);

    return (
        <group castShadow receiveShadow>
            <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, thickness + 0.0001, 0]}>
                <extrudeGeometry args={[glassBoxSideShape, { depth: height - thickness, bevelEnabled: false }]} />
                <MeshTransmissionMaterial color={'#B8DBFC'} clearcoat={1} samples={20} resolution={2048} thickness={0.05} roughness={0.1} anisotropy={1} chromaticAberration={0} />
            </mesh>
            <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
                <extrudeGeometry args={[glassBoxBottomShape, { depth: thickness, bevelEnabled: false }]} />
                <meshStandardMaterial color='#3c3c3c' />
            </mesh>
            <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[width / 2, 0, -length / 2]}>
                <extrudeGeometry args={[pillarShape, { depth: height, bevelEnabled: false }]} />
                <meshStandardMaterial color='#8c8c8c' roughness={0.1} metalness={0.3} />
            </mesh>
            <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[-width / 2, 0, -length / 2]}>
                <extrudeGeometry args={[pillarShape, { depth: height, bevelEnabled: false }]} />
                <meshStandardMaterial color='#8c8c8c' roughness={0.1} metalness={0.3} />
            </mesh>
            <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, Math.PI]} position={[-width / 2, 0, length / 2]}>
                <extrudeGeometry args={[pillarShape, { depth: height, bevelEnabled: false }]} />
                <meshStandardMaterial color='#8c8c8c' roughness={0.1} metalness={0.3} />
            </mesh>
            <mesh castShadow receiveShadow rotation={[-Math.PI / 2, 0, -Math.PI / 2]} position={[width / 2, 0, length / 2]}>
                <extrudeGeometry args={[pillarShape, { depth: height, bevelEnabled: false }]} />
                <meshStandardMaterial color='#8c8c8c' roughness={0.1} metalness={0.3} />
            </mesh>
        </group>
    )
}

export default GlassBox