import * as THREE from 'three'
import React from 'react';
import { useFrame } from "@react-three/fiber";

const Water = () => {
    const waterRef = React.useRef();
    const time = React.useRef(0);

    useFrame(() => {
        time.current += 0.05;
        if (waterRef.current) {
        waterRef.current.material.uniforms.time.value = time.current;
        }
    });

    return (
        <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[5, 5, 32, 32]} />
        <shaderMaterial
        opacity={0.1}
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

export default Water