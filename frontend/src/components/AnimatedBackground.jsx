import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const palette = [
  new THREE.Color('#8b5cf6'),
  new THREE.Color('#4c1d95'),
  new THREE.Color('#38bdf8'),
  new THREE.Color('#0ea5e9'), 
  new THREE.Color('#f472b6'),
];

const AnimatedBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x01030a, 0.0015);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 30);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.18;
    controls.enablePan = false;
    controls.minDistance = 12;
    controls.maxDistance = 60;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.6,
      0.3,
      0.05
    );
    composer.addPass(bloomPass);

    const networkGroup = new THREE.Group();
    scene.add(networkGroup);

    const nodes = [];
    const nodePositions = [];
    const nodeColors = [];
    const nodeSizes = [];

    const nodeCount = 420;
    for (let i = 0; i < nodeCount; i++) {
      const radius = THREE.MathUtils.randFloat(6, 18);
      const phi = Math.acos(THREE.MathUtils.randFloat(-1, 1));
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const position = new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi) * 0.85,
        radius * Math.sin(phi) * Math.sin(theta)
      );

      const color = palette[Math.floor(Math.random() * palette.length)].clone();
      const size = THREE.MathUtils.randFloat(0.4, 1.6);

      nodes.push({ position, color });
      nodePositions.push(position.x, position.y, position.z);
      nodeColors.push(color.r, color.g, color.b);
      nodeSizes.push(size);
    }

    const nodesGeometry = new THREE.BufferGeometry();
    nodesGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(nodePositions, 3)
    );
    nodesGeometry.setAttribute(
      'customColor',
      new THREE.Float32BufferAttribute(nodeColors, 3)
    );
    nodesGeometry.setAttribute(
      'size',
      new THREE.Float32BufferAttribute(nodeSizes, 1)
    );

    const nodesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;
        varying float vGlow;
        void main() {
          vColor = customColor;
          vGlow = sin(uTime * 0.6 + position.y * 0.2) * 0.5 + 0.5;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (180.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vGlow;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, dist);
          vec3 color = vColor * (0.25 + vGlow * 0.15);
          gl_FragColor = vec4(color, alpha * 0.4);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const nodesPoints = new THREE.Points(nodesGeometry, nodesMaterial);
    networkGroup.add(nodesPoints);

    const connectionPositions = [];
    const connectionColors = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < 8 && Math.random() < 0.12) {
          connectionPositions.push(
            nodes[i].position.x,
            nodes[i].position.y,
            nodes[i].position.z,
            nodes[j].position.x,
            nodes[j].position.y,
            nodes[j].position.z
          );
          const color = nodes[i].color
            .clone()
            .lerp(nodes[j].color, 0.5)
            .multiplyScalar(0.9);
          connectionColors.push(
            color.r,
            color.g,
            color.b,
            color.r,
            color.g,
            color.b
          );
        }
      }
    }

    const connectionsGeometry = new THREE.BufferGeometry();
    connectionsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(connectionPositions, 3)
    );
    connectionsGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(connectionColors, 3)
    );

    const connectionsMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
    });

    const connectionLines = new THREE.LineSegments(
      connectionsGeometry,
      connectionsMaterial
    );
    networkGroup.add(connectionLines);

    const starPositions = [];
    const starColors = [];
    const starCount = 1200;
    for (let i = 0; i < starCount; i++) {
      const radius = THREE.MathUtils.randFloat(40, 180);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = Math.acos(THREE.MathUtils.randFloat(-1, 1));
      starPositions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      );
      const color = palette[Math.floor(Math.random() * palette.length)]
        .clone()
        .multiplyScalar(THREE.MathUtils.randFloat(0.4, 1.1));
      starColors.push(color.r, color.g, color.b);
    }

    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starPositions, 3)
    );
    starsGeometry.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(starColors, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      size: 1.6,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const clock = new THREE.Clock();
    let animationFrame = 0;

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloomPass.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      nodesMaterial.uniforms.uTime.value = elapsed;
      networkGroup.rotation.y += 0.0007;
      networkGroup.rotation.x = Math.sin(elapsed * 0.05) * 0.04;
      stars.rotation.y -= 0.00015;
      controls.update();
      composer.render();
    };

    animate();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', onResize);
      controls.dispose();
      composer.dispose();
      renderer.dispose();
      nodesGeometry.dispose();
      connectionsGeometry.dispose();
      starsGeometry.dispose();
      nodesMaterial.dispose();
      connectionsMaterial.dispose();
      starsMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div ref={containerRef} className="absolute inset-0 opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/85 via-[#020617]/60 to-[#020617]/90" />
    </div>
  );
};

export default AnimatedBackground;
