import * as THREE from 'three';
import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSelector } from 'react-redux';

const Water = () => {
    const { width, length, height } = useSelector((state) => state.aquariumCfg);
    const waterMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                uColor: { value: new THREE.Color(0xEEEEEE) },
                uDepth: { value: height },
                resolution: { value: new THREE.Vector2(width, length) },
            },
            vertexShader: `
                uniform float time;
                varying vec2 vUv;
                varying vec3 vPosition;
                
                float calculateWave(vec2 pos, float time, float freq, float amplitude) {
                    return sin(pos.x * freq + time) * cos(pos.y * freq + time) * amplitude;
                }
                
                void main() {
                    vUv = uv;
                    vPosition = position;
                    
                    vec3 pos = position;
                    float wave1 = calculateWave(pos.xy, time * 1.0, 3.0, 0.1);
                    float wave2 = calculateWave(pos.xy, time * 0.8, 5.0, 0.05);
                    float wave3 = calculateWave(pos.xy, time * 1.2, 7.0, 0.025);
                    
                    pos.z += wave1 + wave2 + wave3;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 uColor;
                uniform float time;
                uniform float uDepth;
                varying vec2 vUv;
                varying vec3 vPosition;
                
                void main() {
                    vec3 waterColor = uColor;
                    
                    float surface = sin(vUv.x * 10.0 + time) * sin(vUv.y * 10.0 + time) * 0.1;
                    float depth = 1.0 - (vPosition.y / uDepth);
                    
                    vec3 finalColor = mix(waterColor, vec3(1.0), surface);
                    finalColor = mix(finalColor, waterColor * 0.5, depth * 0.5);
                    
                    gl_FragColor = vec4(finalColor, 0.3); // Set alpha to 0.1 for transparency
                }
            `,
            transparent: true,
            side: THREE.DoubleSide,
        });
    }, [height]);

    useFrame((state) => {
        waterMaterial.uniforms.time.value = state.clock.getElapsedTime();
    });

    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, height * 0.9, 0]}
            scale={[width, length, 1]}
        >
            <planeGeometry args={[1, 1, 64, 64]} />
            <primitive object={waterMaterial} attach="material" />
        </mesh>
    );
};

export default Water;