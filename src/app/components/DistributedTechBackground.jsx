'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Tech stack items with icon URLs (same as in StackVisualization)
const stackItems = [
  { 
    name: 'Kotlin', 
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg'
  },
  { 
    name: 'Swift',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg'
  },
  { 
    name: 'Android',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-original.svg'
  },
  { 
    name: 'iOS',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg'
  },
  { 
    name: 'Spring Boot',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg'
  },
  { 
    name: 'KMP',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-plain-wordmark.svg'
  },
  { 
    name: 'Docker',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg'
  },
  { 
    name: 'GraphQL',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg'
  },
  { 
    name: 'GitHub Actions',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg'
  },
  { 
    name: 'PostgreSQL',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg'
  },
  { 
    name: 'Figma',
    iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg'
  }
];

const DistributedTechBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Setup camera - wide field of view to see more of the scene
    const camera = new THREE.PerspectiveCamera(
      45, 
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 80;
    camera.position.y = 10;
    camera.lookAt(0, 0, 0);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    rendererRef.current = renderer;
    
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(20, 30, 40);
    scene.add(pointLight);

    // Auto-rotate the entire scene
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enabled = false; // Disable user interaction

    // Setup texture loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    // Create multiple icon clusters distributed throughout the scene
    const createIconClusters = () => {
      // We'll create multiple clusters
      const clusters = 3;
      const iconsPerCluster = stackItems.length;
      const promises = [];

      for (let cluster = 0; cluster < clusters; cluster++) {
        // Generate a random offset for this cluster
        const clusterOffset = new THREE.Vector3(
          (Math.random() - 0.5) * 120, // wide X spread
          (Math.random() - 0.5) * 80,  // wide Y spread
          (Math.random() - 0.5) * 60   // moderate Z spread
        );

        // Create icons for this cluster with shuffled order
        const shuffledItems = [...stackItems].sort(() => Math.random() - 0.5);
        
        for (let i = 0; i < iconsPerCluster; i++) {
          const item = shuffledItems[i % shuffledItems.length];
          promises.push(createIcon(item, i, clusterOffset, cluster));
        }
      }

      return Promise.all(promises);
    };

    // Create a single icon
    const createIcon = (item, index, clusterOffset, clusterIndex) => {
      return new Promise((resolve) => {
        textureLoader.load(
          item.iconUrl,
          (texture) => {
            // Generate random position within a spherical distribution
            const radius = 15 + Math.random() * 10; // Small sphere with random variation
            const phi = Math.acos(-1 + (Math.random() * 2));
            const theta = Math.random() * Math.PI * 2;
            
            const x = radius * Math.sin(phi) * Math.cos(theta) + clusterOffset.x;
            const y = radius * Math.sin(phi) * Math.sin(theta) + clusterOffset.y;
            const z = radius * Math.cos(phi) + clusterOffset.z;
            
            // Create icon with smaller size for background
            const size = 1.0 + Math.random() * 0.4; 
            const iconGeometry = new THREE.PlaneGeometry(size, size);
            const iconMaterial = new THREE.MeshBasicMaterial({
              map: texture,
              transparent: true,
              opacity: 0.7 + Math.random() * 0.3, // Random opacity for depth effect
              side: THREE.DoubleSide,
              alphaTest: 0.1
            });
            
            const iconMesh = new THREE.Mesh(iconGeometry, iconMaterial);
            iconMesh.position.set(x, y, z);
            
            // Store some metadata for animations
            iconMesh.userData = {
              basePosition: new THREE.Vector3(x, y, z),
              rotationSpeed: (0.1 + Math.random() * 0.2) * (Math.random() > 0.5 ? 1 : -1),
              floatSpeed: 0.3 + Math.random() * 0.7,
              floatAmplitude: 0.02 + Math.random() * 0.04,
              clusterIndex
            };
            
            scene.add(iconMesh);
            resolve(iconMesh);
          },
          undefined,
          (error) => {
            console.error('Error loading texture:', error);
            resolve(null);
          }
        );
      });
    };

    // Create the icons
    const iconMeshes = [];
    createIconClusters().then((meshes) => {
      meshes.forEach(mesh => {
        if (mesh) iconMeshes.push(mesh);
      });
    });

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      // Update controls
      controls.update();

      const time = Date.now() * 0.001;

      // Animate each icon
      iconMeshes.forEach(mesh => {
        if (!mesh) return;

        const { basePosition, rotationSpeed, floatSpeed, floatAmplitude, clusterIndex } = mesh.userData;

        // Gentle floating motion
        const floatOffset = Math.sin(time * floatSpeed + clusterIndex * 0.5) * floatAmplitude;
        
        mesh.position.y = basePosition.y + floatOffset;
        
        // Always face the camera
        mesh.lookAt(camera.position);
      });

      // Render
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (mountRef.current && rendererRef.current?.domElement) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }

      window.removeEventListener('resize', handleResize);
      
      // Dispose of resources
      sceneRef.current?.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
      });
      
      rendererRef.current?.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-5" 
      style={{ opacity: 0.2 }}
    />
  );
};

export default DistributedTechBackground;