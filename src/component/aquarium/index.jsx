import React from 'react'

import Water from './water';

const Aquarium = () => {
    return (
        <>
            <Water />
            <mesh>
                <boxGeometry args={[2, 3, 4]} />
                <meshStandardMaterial color='green' />
            </mesh>
        </>
    )
}

export default Aquarium