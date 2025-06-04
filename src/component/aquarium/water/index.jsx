import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';
import { useFrame } from "@react-three/fiber";
import { useSelector } from 'react-redux';

const Water = () => {
    const waterRef = useRef();
    const time = useRef(0);
    const { width, length, height, thickness } = useSelector((state) => state.aquariumCfg);

    // Create geometry only once
    const geometry = useRef(new THREE.PlaneGeometry(width - thickness, length - thickness, 32, 32)).current;

    // Update geometry dimensions when width or length changes
    useEffect(() => {
        if (waterRef.current) {
            // Update geometry size
            geometry.dispose(); // Dispose the old geometry to free memory
            const newGeometry = new THREE.PlaneGeometry(width - thickness, length - thickness, 32, 32);
            waterRef.current.geometry = newGeometry; // Assign the new geometry
            waterRef.current.geometry.needsUpdate = true; // Mark geometry as needing an update
        }
    }, [width, length, thickness]);

    useFrame(() => {
        time.current += 0.05;
        if (waterRef.current) {
            waterRef.current.material.uniforms.time.value = time.current;
            waterRef.current.material.needsUpdate = true; // Mark material as needing an update
        }
    });

    return (
        <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, height * 0.9, 0]}>
            <primitive object={geometry} />
            <shaderMaterial
                opacity={0.5}
                transparent={true}
                side={THREE.DoubleSide}
                uniforms={{
                    time: { value: 0 },
                    color: { value: new THREE.Color(0x1e90ff) },
                }}
                vertexShader={`
                varying vec2 vUv;
                uniform float time;
                void main() {
                    vUv = uv;
                    vec4 pos = vec4(position, 1.0);
                    pos.z += sin(vUv.x * 20.0 + time) * 0.03;
                    pos.z += cos(vUv.y * 20.0 + time) * 0.03;
                    gl_Position = projectionMatrix * modelViewMatrix * pos;
                }
                `}
                fragmentShader={`
                varying vec2 vUv;
                uniform vec3 color;
                void main() {
                    gl_FragColor = vec4(color, 0.5); // Adjust alpha for translucency
                }
                `}
            />
        </mesh>
    );
};

export default Water;