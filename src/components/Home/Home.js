import React, { Suspense, useCallback, useMemo, useRef } from "react";
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from "react-router-dom";
import "./Home.css";
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import {Canvas, useFrame, useLoader, useThree, extend} from '@react-three/fiber'
import featureImg from '../../assets/feature.png'
import circleImg from '../../assets/circle.png'
extend({OrbitControls})


function CameraControls() {

  const {
    camera,
    gl: {domElement}
  } = useThree()

  const controlsRef = useRef()
  useFrame(() => controlsRef.current.update())

  return(
    <orbitControls
      ref={controlsRef}
      args={[camera, domElement]}
      autoRotate
      autoRotateSpeed={-0.2}
    />
  )
}

function Points() {
  const imgTex = useLoader(THREE.TextureLoader, circleImg)
  const bufferRef = useRef()

  let t = 0
  let f = 0.002
  let a = 6
  const graph = useCallback((x, z) => {
    return Math.sin(f * (x ** 2 + z ** 2 + t)) * a
  }, [t, f, a])
  const count = 100
  const sep = 3
  let positions = useMemo(() => {
    let positions = []

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2)
        let z = sep * (zi - count / 2)
        let y = graph(x, z)
        positions.push(x, y, z)
      }
    }

    return new Float32Array(positions)
  }, [count, sep, graph])

useFrame(() => {
  t += 15

  const positions = bufferRef.current.array
  
  let i = 0
  for (let xi = 0; xi < count; xi++) {
    for (let zi = 0; zi < count; zi++) {
      let x = sep * (xi - count / 2)
      let z = sep * (zi - count / 2)
      positions[i + 1] = graph(x, z)

      i += 3
    }
  }

  bufferRef.current.needsUpdate = true

})

  return(
    <points>
      <bufferGeometry attach='geometry'>
          <bufferAttribute
            ref={bufferRef}
            attach='attributes-position'
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
      </bufferGeometry>

      <pointsMaterial
      attach='material'
      map={imgTex}
      color={0x607D8B}
      size={0.5}
      sizeAttenuation
      transparent={false}
      alphaTest={0.5}
      opacity={1.0}
      />
    </points>
  )
}

function AnimationCanvas() {
  return(
    <div className="animation-container">
      <Canvas
        colorManagement={false}
        camera={{ position: [100, 10, 0], fov: 75 }}
      >
        <Suspense fallback={null}>
          <Points />
        </Suspense>
        <CameraControls />
      </Canvas>
    </div>
  )
}



export default function Home() {
  const navigate = useNavigate()

  function handleButtonClick() {
    navigate('/signup')
  }


  return (
    <div className="home">
      <header className="home-header">
        <h1>
        Welcome to educ<span STYLE="text-decoration:underline">AI</span>ter
        </h1>
        <p>Your personalized learning platform</p>
      </header>
      <main className="home-main">
        <TypeAnimation
          sequence={[
            "Tailored learning paths based on your preferences and learning style", 1000,
            "Explore a wide range of learning tracks and courses", 1000,
            // "Engage with our vibrant community of learners and experts", 1000,
            "Track your progress", 1000,
            "Achieve your learning goals with personalized dashboards", 1000,
            // "Affordable learning. High quality education should be accessible to everyone", 1500,
          ]}
          speed={120}
          deleteSpeed={200}
          delaySpeed={1000}
          repeat={Infinity}
          style={{ fontSize: '1.5em', display: 'inline-block' }}
          className="sequence"
        />
        <section className="home-main-intro">
        
            <h2>Transform Your Learning Experience with educAIter</h2>
            <p>Experience personalized learning like never before.</p>
            <p>Understand your strengths, work on your weaknesses, and achieve your learning goals faster and more effectively.</p>
            <Suspense fallback={<div>Loading...</div>}>
              <AnimationCanvas />
            </Suspense>
        </section>
        <section className="home-main-features">
          
    {/* <img className="feature-img" src={featureImg} /> */}
    <h3>Unique Features</h3>

  
    <div className="feature-card">
        <h4>AI-Powered Learning Experience:</h4>
        <p><strong>Interactive Chat: </strong><br />Engage with an AI tutor that adapts to your learning style. Choose from various avatars specialized in different subjects and customize their visual appearance.</p><br />
        <p><strong>Image Analysis: </strong><br />Utilize Computer Vision to upload images of your homework or other visual materials for analysis and assistance in real-time.</p>
    </div>

    <div className="feature-card">
        <h4>Personalized Assessments and Quizzes:</h4>
        <p><strong>Adaptive Quizzes: </strong><br />Select your subject and difficulty level, and the AI will generate tailored quiz questions, providing immediate feedback and corrections.</p><br />
        <p><strong>Performance Tracking: </strong><br />Your chat conversations and quiz results form the basis for ongoing assessment, ensuring a learning path that grows with you.</p>
    </div>
  
    <div className="feature-card">
        <h4>Strengths and Weaknesses Analysis:</h4>
        <p><strong>Data Visualization: </strong><br />Through intuitive graphs and charts, track your performance across various subjects to understand where you excel and where you need improvement.</p><br />
        <p><strong>Personalized Insights: </strong><br />Gain valuable insights into your learning journey, backed by data-driven analysis of your strengths and weaknesses.</p>
    </div>
    <div className="feature-card">
        <h4>Intelligent Recommender System:</h4>
        <p><strong>Focused Learning: </strong><br />Based on your performance and areas of strength or weakness, the AI recommends specific areas to focus on.</p><br />
        <p><strong>Guided Path: </strong><br />Receive personalized suggestions and resources, guiding you on the most efficient path towards achieving your learning goals.</p>
    </div>

</section>

        <section className="home-main-cta">
            <h3>Ready to Revolutionize Your Learning?</h3>
            <button onClick={handleButtonClick}>Start Your Free Trial </button>
      
        </section>
      </main>
      <footer className="home-footer">
      Copyright © 2023 educAIter
      </footer>
    </div>
  );
}
