import * as THREE from 'three'
import React, { useMemo } from 'react'
import { useThree } from '@react-three/fiber'
import { useSelector } from 'react-redux';

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
    
    return (
        <>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, thickness + 0.0001, 0]}>
                <extrudeGeometry args={[glassBoxSideShape, { depth: height - thickness, bevelEnabled: false }]} />
                <meshPhysicalMaterial
                    color="lightblue"
                    transparent
                    opacity={0.2}
                    roughness={0.1}
                    metalness={0.3}
                    clearcoat={0.5}
                    clearcoatRoughness={0.1}
                    refractionRatio={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <extrudeGeometry args={[glassBoxBottomShape, { depth: thickness, bevelEnabled: false }]} />
                <meshPhysicalMaterial
                    color="lightblue"
                    transparent
                    opacity={0.2}
                    roughness={0.1}
                    metalness={0.3}
                    clearcoat={0.5}
                    clearcoatRoughness={0.1}
                    refractionRatio={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </>
    )
}

export default GlassBox