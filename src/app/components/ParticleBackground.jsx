"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Append renderer to DOM
    mountRef.current.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    // Set positions and colors for particles
    for(let i = 0; i < particlesCount * 3; i += 3) {
      // Position (random in a spherical distribution)
      posArray[i] = (Math.random() - 0.5) * 5;
      posArray[i+1] = (Math.random() - 0.5) * 5;
      posArray[i+2] = (Math.random() - 0.5) * 5;
      
      // Colors (gradients of blue and purple)
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // Indigo tone
        colorsArray[i] = 0.39;   // R: 99/255
        colorsArray[i+1] = 0.39; // G: 102/255
        colorsArray[i+2] = 0.94; // B: 241/255
      } else if (colorChoice < 0.66) {
        // Blue tone
        colorsArray[i] = 0.23;   // R: 59/255
        colorsArray[i+1] = 0.51; // G: 130/255
        colorsArray[i+2] = 0.96; // B: 246/255
      } else {
        // Purple tone
        colorsArray[i] = 0.54;   // R: 139/255
        colorsArray[i+1] = 0.28; // G: 72/255
        colorsArray[i+2] = 0.96; // B: 246/255
      }
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    // Material for particles
    const particlesMaterial = new THREE.PointsMaterial({ 
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true
    });
    
    // Create the particle system
    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);

    // Position camera
    camera.position.z = 2;
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate slowly based on mouse position
      particleMesh.rotation.x += 0.0025; 
      particleMesh.rotation.y += 0.0025; 
      
      if (mouseX && mouseY) {
        particleMesh.rotation.x += mouseY * 0.001; 
        particleMesh.rotation.y += mouseX * 0.001; 
      }
      
      // Render
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Safe cleanup of renderer DOM element
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-screen h-screen z-10 pointer-events-none opacity-50"
      aria-hidden="true"
    />
  );
};

export default ParticleBackground;