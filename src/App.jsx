import { Center, Html, OrbitControls, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

export default function App() {
  const [partymode, setPartymode] = useState(false);

  const cat = useGLTF('./cat_model/scene.gltf');

  const catRef = useRef();
  const lightRef = useRef();

  const animations = useAnimations(cat.animations, cat.scene);


  useEffect(() => {
    catRef.current.castShadow = true;
    const action = animations.actions['All Animations'];
    action.play()
  }, []);

  useEffect(() => {
    if (partymode) {
      setInterval(() => {
        lightRef.current.color.r = Math.random()
        lightRef.current.color.g = Math.random()
        lightRef.current.color.b = Math.random()
      }, 300)
    }
  }, [partymode])
  useFrame((state, delta) => {
    state.camera.position.x += 0.01
    state.camera.position.y += 0.003
  })

  return (
    <>
      <Center>
        <Html position={[0, 3, 0]}>
          <button onClick={() => setPartymode(!partymode)} style={{display: `${partymode ? 'none' : 'flex'}`}}>Activate party mode</button>
        </Html>
      </Center>
      <OrbitControls />
      <spotLight ref={lightRef} castShadow position={[0, 2, 0]} intensity={1.0} color='white' penumbra={1} />
      <ambientLight intensity={0.01} />

      <primitive object={cat.scene} scale={2} ref={catRef} />
      <mesh rotation-x={-Math.PI / 2} scale={10} receiveShadow>
        <planeGeometry />
        <meshStandardMaterial color='white' />
      </mesh>
    </>
  );
}