import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
   
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 3, 8]
      }}
    >
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </Canvas>
    <Loader containerStyles={{ backgroundColor: 'black' }} />
  </>,
)