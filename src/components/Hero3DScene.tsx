import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  Box,
  Compass,
  Cpu,
  Globe2,
  Layers,
  MapPin,
  Navigation,
  Radio,
  Zap,
} from 'lucide-react';
import { RESCUE_NODES, RescueNode } from '../data/foodBridgeData';
import { sound } from '../utils/soundEffects';

interface Hero3DSceneProps {
  selectedNode: RescueNode;
  onSelectNode: (node: RescueNode) => void;
  onOpenDonateModal: () => void;
}

type ViewMode3D = 'city' | 'globe' | 'crate';

export const Hero3DScene: React.FC<Hero3DSceneProps> = ({
  selectedNode,
  onSelectNode,
  onOpenDonateModal,
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode3D>('city');
  const [rescuePulseCount, setRescuePulseCount] = useState<number>(142850);
  const [isDispatchingBoost, setIsDispatchingBoost] = useState<boolean>(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const boostRef = useRef<number>(1);
  const modeRef = useRef<ViewMode3D>('city');

  useEffect(() => {
    modeRef.current = viewMode;
  }, [viewMode]);

  const triggerLiveRescueWave = () => {
    sound.radar();
    setIsDispatchingBoost(true);
    boostRef.current = 3.6;
    setRescuePulseCount((prev) => prev + selectedNode.mealsEquivalent);
    setTimeout(() => {
      boostRef.current = 1;
      setIsDispatchingBoost(false);
    }, 2400);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 520;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Clear container and mount canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(7.8, 6.4, 8.6);
    camera.lookAt(0, 0.4, 0);

    // Warm Harvest & Forest Ambient + Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xfbf8f3, 1.35);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfff3e0, 2.2);
    sunLight.position.set(8, 14, 9);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const terracottaPoint = new THREE.PointLight(0xe05a2b, 3.2, 14);
    terracottaPoint.position.set(-2.5, 3.5, -1.5);
    scene.add(terracottaPoint);

    const emeraldPoint = new THREE.PointLight(0x2ecc71, 3.0, 14);
    emeraldPoint.position.set(1.5, 3.2, 1.5);
    scene.add(emeraldPoint);

    // Master World Group for user drag rotation
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // ============================================================
    // GROUP 1: 3D URBAN RESCUE GRID (CITY)
    // ============================================================
    const cityGroup = new THREE.Group();
    worldGroup.add(cityGroup);

    // Base Tactile Platform Slab
    const baseGeo = new THREE.CylinderGeometry(5.3, 5.6, 0.45, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x162b20,
      roughness: 0.6,
      metalness: 0.15,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.25;
    baseMesh.receiveShadow = true;
    cityGroup.add(baseMesh);

    // Outer Golden Brass Rim Ring
    const rimGeo = new THREE.TorusGeometry(5.42, 0.055, 16, 96);
    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xd9822b,
      roughness: 0.3,
      metalness: 0.7,
      emissive: 0xd9822b,
      emissiveIntensity: 0.2,
    });
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = -0.02;
    cityGroup.add(rimMesh);

    // Concentric Radar Grid Rings on Platform
    [1.8, 3.2, 4.6].forEach((radius, idx) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.025, radius + 0.025, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: idx === 0 ? 0x2ecc71 : 0xd9822b,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: idx === 0 ? 0.45 : 0.22,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.02;
      cityGroup.add(ring);
    });

    // Background Stylized City Blocks
    const cityBlockCoords: [number, number, number, number, number][] = [
      [-1.8, -2.8, 0.7, 0.65, 0.7],
      [1.2, -3.1, 0.6, 0.95, 0.6],
      [-3.7, 0.4, 0.65, 0.75, 0.65],
      [3.6, -0.3, 0.7, 0.85, 0.7],
      [0.4, 3.3, 0.85, 0.6, 0.65],
      [-1.2, 1.5, 0.55, 0.5, 0.55],
      [1.8, 1.1, 0.6, 0.7, 0.6],
      [-0.4, -1.6, 0.5, 0.6, 0.5],
      [2.2, -1.2, 0.5, 0.45, 0.5],
      [-2.3, -0.5, 0.55, 0.55, 0.55],
    ];

    const blockMat = new THREE.MeshStandardMaterial({
      color: 0x213d2e,
      roughness: 0.5,
      metalness: 0.2,
    });

    cityBlockCoords.forEach(([x, z, w, h, d]) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, blockMat);
      mesh.position.set(x, h / 2, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      cityGroup.add(mesh);
    });

    // Central NGO Hub Sanctuary Tower (Annapurna Seva Central Bridge)
    const hubCenter = new THREE.Vector3(0.2, 0, -0.3);
    const hubTowerGeo = new THREE.CylinderGeometry(0.58, 0.72, 1.55, 8);
    const hubTowerMat = new THREE.MeshStandardMaterial({
      color: 0x1f6e43,
      roughness: 0.25,
      metalness: 0.3,
      emissive: 0x1f6e43,
      emissiveIntensity: 0.35,
    });
    const hubTower = new THREE.Mesh(hubTowerGeo, hubTowerMat);
    hubTower.position.set(hubCenter.x, 0.775, hubCenter.z);
    hubTower.castShadow = true;
    cityGroup.add(hubTower);

    // Floating Emerald Sanctuary Halo above Hub
    const haloGeo = new THREE.TorusGeometry(0.85, 0.045, 16, 48);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x4ade80,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2;
    haloMesh.position.set(hubCenter.x, 1.85, hubCenter.z);
    cityGroup.add(haloMesh);

    // Donor Towers + Glowing Beacons + Parabolic Rescue Bridges
    interface PodRunner {
      mesh: THREE.Mesh;
      trailMesh: THREE.Mesh;
      curve: THREE.QuadraticBezierCurve3;
      progress: number;
      speed: number;
    }

    const podRunners: PodRunner[] = [];
    const donorBeaconMeshes: THREE.Mesh[] = [];

    RESCUE_NODES.filter((n) => n.type === 'donor').forEach((donor, index) => {
      const [dx, dy, dz] = donor.position3D;

      // Donor architectural tower
      const towerGeo = new THREE.BoxGeometry(0.82, dy * 1.35, 0.82);
      const towerMat = new THREE.MeshStandardMaterial({
        color: 0xfbf8f3,
        roughness: 0.35,
        metalness: 0.1,
      });
      const tower = new THREE.Mesh(towerGeo, towerMat);
      tower.position.set(dx, (dy * 1.35) / 2, dz);
      tower.castShadow = true;
      cityGroup.add(tower);

      // Terracotta Roof Cap
      const capGeo = new THREE.BoxGeometry(0.9, 0.14, 0.9);
      const capMat = new THREE.MeshStandardMaterial({
        color: 0xe05a2b,
        emissive: 0xe05a2b,
        emissiveIntensity: 0.4,
      });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(dx, dy * 1.35 + 0.08, dz);
      cityGroup.add(cap);

      // Floating Harvest Octahedron Beacon
      const beaconGeo = new THREE.OctahedronGeometry(0.24, 0);
      const beaconMat = new THREE.MeshStandardMaterial({
        color: 0xff7847,
        emissive: 0xe05a2b,
        emissiveIntensity: 0.7,
        roughness: 0.2,
      });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.set(dx, dy * 1.35 + 0.55, dz);
      cityGroup.add(beacon);
      donorBeaconMeshes.push(beacon);

      // Parabolic 3D Bridge Curve from Donor to Central NGO Hub
      const startPt = new THREE.Vector3(dx, dy * 1.35 + 0.3, dz);
      const endPt = new THREE.Vector3(hubCenter.x, 1.55, hubCenter.z);
      const midPt = new THREE.Vector3(
        (dx + hubCenter.x) * 0.5,
        2.9 + index * 0.32,
        (dz + hubCenter.z) * 0.5
      );

      const curve = new THREE.QuadraticBezierCurve3(startPt, midPt, endPt);
      const tubeGeo = new THREE.TubeGeometry(curve, 44, 0.035, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: index % 2 === 0 ? 0xe05a2b : 0xd9822b,
        transparent: true,
        opacity: 0.55,
      });
      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      cityGroup.add(tubeMesh);

      // Moving 3D Rescue Pod Spheres along each Bridge
      for (let p = 0; p < 2; p++) {
        const podGeo = new THREE.SphereGeometry(0.11, 16, 16);
        const podMat = new THREE.MeshBasicMaterial({
          color: p === 0 ? 0xffedd5 : 0x4ade80,
        });
        const podMesh = new THREE.Mesh(podGeo, podMat);

        const trailGeo = new THREE.SphereGeometry(0.18, 12, 12);
        const trailMat = new THREE.MeshBasicMaterial({
          color: 0xe05a2b,
          transparent: true,
          opacity: 0.35,
        });
        const trailMesh = new THREE.Mesh(trailGeo, trailMat);

        cityGroup.add(podMesh);
        cityGroup.add(trailMesh);

        podRunners.push({
          mesh: podMesh,
          trailMesh,
          curve,
          progress: (p * 0.5 + index * 0.17) % 1,
          speed: 0.0042 + index * 0.0005,
        });
      }
    });

    // ============================================================
    // GROUP 2: 3D PLANETARY HUNGER-VS-SURPLUS GLOBE
    // ============================================================
    const globeGroup = new THREE.Group();
    globeGroup.visible = false;
    worldGroup.add(globeGroup);

    const globeSphereGeo = new THREE.SphereGeometry(2.85, 36, 36);
    const globeSphereMat = new THREE.MeshStandardMaterial({
      color: 0x182e23,
      roughness: 0.45,
      metalness: 0.25,
      wireframe: false,
    });
    const globeSphere = new THREE.Mesh(globeSphereGeo, globeSphereMat);
    globeSphere.position.y = 1.2;
    globeGroup.add(globeSphere);

    const wireframeGeo = new THREE.SphereGeometry(2.89, 24, 18);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x2ecc71,
      wireframe: true,
      transparent: true,
      opacity: 0.24,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeo, wireframeMat);
    wireframeMesh.position.y = 1.2;
    globeGroup.add(wireframeMesh);

    // Orbital Rescue Rings around Globe
    const orbitRing1Geo = new THREE.TorusGeometry(3.65, 0.035, 16, 100);
    const orbitRing1Mat = new THREE.MeshBasicMaterial({ color: 0xe05a2b });
    const orbitRing1 = new THREE.Mesh(orbitRing1Geo, orbitRing1Mat);
    orbitRing1.position.y = 1.2;
    orbitRing1.rotation.x = Math.PI / 3;
    orbitRing1.rotation.y = Math.PI / 6;
    globeGroup.add(orbitRing1);

    const orbitRing2Geo = new THREE.TorusGeometry(4.1, 0.025, 16, 100);
    const orbitRing2Mat = new THREE.MeshBasicMaterial({ color: 0xd9822b });
    const orbitRing2 = new THREE.Mesh(orbitRing2Geo, orbitRing2Mat);
    orbitRing2.position.y = 1.2;
    orbitRing2.rotation.x = -Math.PI / 2.6;
    globeGroup.add(orbitRing2);

    // Surface Hotspots on Globe
    for (let i = 0; i < 28; i++) {
      const phi = Math.acos(-1 + (2 * i) / 28);
      const theta = Math.sqrt(28 * Math.PI) * phi;
      const r = 2.92;
      const gx = r * Math.cos(theta) * Math.sin(phi);
      const gy = r * Math.sin(theta) * Math.sin(phi) + 1.2;
      const gz = r * Math.cos(phi);

      const dotGeo = new THREE.SphereGeometry(i % 3 === 0 ? 0.11 : 0.075, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({
        color: i % 3 === 0 ? 0xe05a2b : 0x4ade80,
      });
      const dot = new THREE.Mesh(dotGeo, dotMat);
      dot.position.set(gx, gy, gz);
      globeGroup.add(dot);
    }

    // ============================================================
    // GROUP 3: 3D SMART THERMAL HARVEST CRATE (EXPLODED IOT VIEW)
    // ============================================================
    const crateGroup = new THREE.Group();
    crateGroup.visible = false;
    worldGroup.add(crateGroup);

    // Outer Insulated Thermal Crate Body
    const outerCrateGeo = new THREE.BoxGeometry(3.8, 1.35, 2.7);
    const outerCrateMat = new THREE.MeshStandardMaterial({
      color: 0x1f6e43,
      roughness: 0.35,
      metalness: 0.2,
    });
    const outerCrate = new THREE.Mesh(outerCrateGeo, outerCrateMat);
    outerCrate.position.y = 0.45;
    crateGroup.add(outerCrate);

    // Terracotta Bumper Rails
    const railGeo = new THREE.BoxGeometry(4.0, 0.22, 2.9);
    const railMat = new THREE.MeshStandardMaterial({
      color: 0xe05a2b,
      roughness: 0.3,
    });
    const bottomRail = new THREE.Mesh(railGeo, railMat);
    bottomRail.position.y = -0.15;
    crateGroup.add(bottomRail);

    // Floating Stainless Gastronorm Food Trays (Middle Layer)
    const trayGeo = new THREE.BoxGeometry(1.65, 0.36, 2.2);
    const trayMat = new THREE.MeshStandardMaterial({
      color: 0xf2ece1,
      metalness: 0.55,
      roughness: 0.25,
    });
    const leftTray = new THREE.Mesh(trayGeo, trayMat);
    leftTray.position.set(-0.92, 1.65, 0);
    crateGroup.add(leftTray);

    const rightTray = new THREE.Mesh(trayGeo, trayMat);
    rightTray.position.set(0.92, 1.65, 0);
    crateGroup.add(rightTray);

    // Warm Saffron & Emerald Food Portions inside Trays
    const food1Geo = new THREE.BoxGeometry(1.45, 0.18, 1.95);
    const food1Mat = new THREE.MeshStandardMaterial({
      color: 0xd9822b,
      emissive: 0xd9822b,
      emissiveIntensity: 0.25,
    });
    const food1 = new THREE.Mesh(food1Geo, food1Mat);
    food1.position.set(-0.92, 1.82, 0);
    crateGroup.add(food1);

    const food2Mat = new THREE.MeshStandardMaterial({
      color: 0x2ecc71,
      emissive: 0x1f6e43,
      emissiveIntensity: 0.25,
    });
    const food2 = new THREE.Mesh(food1Geo, food2Mat);
    food2.position.set(0.92, 1.82, 0);
    crateGroup.add(food2);

    // Floating IoT Thermal Lid with Telemetry Beacon (Top Layer)
    const lidGeo = new THREE.BoxGeometry(3.85, 0.26, 2.75);
    const lidMat = new THREE.MeshStandardMaterial({
      color: 0x14281d,
      roughness: 0.3,
      metalness: 0.4,
    });
    const lidMesh = new THREE.Mesh(lidGeo, lidMat);
    lidMesh.position.y = 2.65;
    crateGroup.add(lidMesh);

    const sensorRingGeo = new THREE.TorusGeometry(0.55, 0.05, 16, 48);
    const sensorRingMat = new THREE.MeshBasicMaterial({ color: 0x4ade80 });
    const sensorRing = new THREE.Mesh(sensorRingGeo, sensorRingMat);
    sensorRing.rotation.x = Math.PI / 2;
    sensorRing.position.y = 2.85;
    crateGroup.add(sensorRing);

    // ============================================================
    // POINTER / DRAG INTERACTION
    // ============================================================
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotY = -0.35;
    let targetRotX = 0.05;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      targetRotY += dx * 0.0085;
      targetRotX = Math.max(-0.35, Math.min(0.45, targetRotX + dy * 0.005));
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 600;
      const newH = container.clientHeight || 520;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      clock += 0.016;

      // Toggle visible 3D group based on viewMode
      cityGroup.visible = modeRef.current === 'city';
      globeGroup.visible = modeRef.current === 'globe';
      crateGroup.visible = modeRef.current === 'crate';

      if (!isDragging) {
        targetRotY += 0.0028 * boostRef.current;
      }

      worldGroup.rotation.y += (targetRotY - worldGroup.rotation.y) * 0.08;
      worldGroup.rotation.x += (targetRotX - worldGroup.rotation.x) * 0.08;

      // Animate City Rescue Pods & Beacons
      if (cityGroup.visible) {
        haloMesh.rotation.z = clock * 0.9;
        haloMesh.position.y = 1.85 + Math.sin(clock * 2.5) * 0.08;

        donorBeaconMeshes.forEach((beacon, idx) => {
          beacon.rotation.y = clock * 1.8 + idx;
          beacon.position.y += Math.sin(clock * 3 + idx) * 0.0025;
        });

        podRunners.forEach((runner) => {
          runner.progress = (runner.progress + runner.speed * boostRef.current) % 1;
          const pos = runner.curve.getPointAt(runner.progress);
          runner.mesh.position.copy(pos);

          const trailPos = runner.curve.getPointAt(
            Math.max(0, runner.progress - 0.04)
          );
          runner.trailMesh.position.copy(trailPos);
        });
      }

      // Animate Planetary Globe
      if (globeGroup.visible) {
        orbitRing1.rotation.z = clock * 0.6;
        orbitRing2.rotation.y = -clock * 0.5;
      }

      // Animate Exploded Smart Thermal Crate
      if (crateGroup.visible) {
        const hoverOffset = Math.sin(clock * 2.2) * 0.12;
        leftTray.position.y = 1.55 + hoverOffset * 0.6;
        rightTray.position.y = 1.55 + hoverOffset * 0.6;
        food1.position.y = 1.73 + hoverOffset * 0.6;
        food2.position.y = 1.73 + hoverOffset * 0.6;
        lidMesh.position.y = 2.55 + hoverOffset * 1.25;
        sensorRing.position.y = 2.75 + hoverOffset * 1.25;
        sensorRing.scale.setScalar(1 + Math.sin(clock * 4) * 0.08);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElem.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[540px] sm:h-[590px] rounded-[28px] bg-gradient-to-br from-[#14281D] via-[#182E23] to-[#0F1F17] border border-[#2A4738] shadow-2xl overflow-hidden select-none">
      {/* Decorative Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#E05A2B]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#1F6E43]/30 blur-3xl" />

      {/* Top HUD Bar: 3D View Switcher & Live Telemetry */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 p-4 sm:px-5 sm:pt-5">
        <div className="inline-flex items-center gap-1.5 bg-[#0F1F17]/90 backdrop-blur-md border border-white/10 p-1 rounded-full">
          <button
            type="button"
            onClick={() => {
              sound.click();
              setViewMode('city');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'city'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>3D Rescue City</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.click();
              setViewMode('globe');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'globe'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>3D Global Grid</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.click();
              setViewMode('crate');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'crate'
                ? 'bg-amber-600 text-white font-semibold shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>3D Thermal Pod</span>
          </button>
        </div>

        <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
          </span>
          <span className="font-mono-tech text-[11px] uppercase tracking-wider text-emerald-300 font-semibold">
            {rescuePulseCount.toLocaleString()} MEALS BRIDGED
          </span>
        </div>
      </div>

      {/* Three.js Interactive 3D Canvas Container */}
      {webglSupported ? (
        <div
          ref={mountRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-10"
          title="Drag to rotate 3D FoodBridge Rescue Network"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-slate-100">
          <div className="max-w-md space-y-3">
            <Layers className="w-12 h-12 text-orange-500 mx-auto" />
            <p className="font-serif-display text-xl">FoodBridge 3D Spatial Telemetry</p>
            <p className="text-sm text-slate-400">
              Interactive 3D Rescue Route Matrix connecting {RESCUE_NODES.length} active donor & NGO hubs.
            </p>
          </div>
        </div>
      )}

      {/* Floating Glassmorphic Telemetry Pill — Top Left Under Switcher */}
      <div className="pointer-events-none absolute top-16 left-4 sm:left-5 z-20 hidden sm:flex flex-col gap-2">
        <div className="bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-2xl px-3.5 py-2.5 text-xs text-slate-200 shadow-xl animate-float-slow">
          <div className="flex items-center gap-2 text-amber-400 font-mono-tech text-[11px] font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI ROUTE ENGINE • 38m AVG DISPATCH</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Drag anywhere on 3D canvas to orbit • Click nodes below
          </p>
        </div>
      </div>

      {/* Trigger Live Rescue Action Button Overlay */}
      <div className="absolute top-16 right-4 sm:right-5 z-20">
        <button
          type="button"
          onClick={triggerLiveRescueWave}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all shadow-lg cursor-pointer ${
            isDispatchingBoost
              ? 'bg-emerald-500 text-slate-950 scale-105 ring-4 ring-emerald-400/30'
              : 'bg-orange-600/95 hover:bg-orange-600 text-white border border-orange-400/30'
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{isDispatchingBoost ? 'Dispatching 3D Pod Wave!' : 'Simulate 3D Rescue Pulse'}</span>
        </button>
      </div>

      {/* Bottom Interactive Node Selector & Live Telemetry Card */}
      <div className="absolute bottom-4 inset-x-4 sm:inset-x-5 z-20 space-y-2.5">
        {/* Node Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {RESCUE_NODES.map((node) => {
            const isSelected = node.id === selectedNode.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => {
                  sound.click();
                  onSelectNode(node);
                  triggerLiveRescueWave();
                }}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-white text-slate-950 border-white shadow-md'
                    : 'bg-slate-900/90 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    node.type === 'ngo' ? 'bg-emerald-400' : 'bg-orange-500'
                  }`}
                />
                <span className="truncate max-w-[140px]">{node.name.split(' ')[0]} {node.name.split(' ')[1]}</span>
                <span className="font-mono-tech text-[10px] opacity-75">
                  {node.mealsEquivalent}m
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Node Telemetry Inspector Card */}
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-3.5 sm:p-4 text-slate-100 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {selectedNode.imageUrl && (
                <img
                  src={selectedNode.imageUrl}
                  alt={selectedNode.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-700 shadow-sm hidden sm:block"
                />
              )}
              <div className="space-y-0.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono-tech uppercase tracking-wider font-semibold ${
                      selectedNode.type === 'ngo'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    }`}
                  >
                    {selectedNode.status}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-400" />
                    {selectedNode.neighborhood}
                  </span>
                </div>
                <h4 className="font-serif-display text-base sm:text-lg text-white leading-snug truncate">
                  {selectedNode.name}
                </h4>
                <p className="text-xs text-slate-300 truncate">
                  <strong className="text-amber-400">Batch:</strong> {selectedNode.activeBatch}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800 shrink-0">
              <div className="text-left sm:text-right">
                <div className="font-mono-tech text-sm sm:text-base font-bold text-emerald-400">
                  {selectedNode.mealsEquivalent} Meals
                </div>
                <div className="font-mono-tech text-[11px] text-slate-400">
                  {selectedNode.quantityKg} kg • -{selectedNode.co2SavedKg}kg CO₂
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  onOpenDonateModal();
                }}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-md"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Log Similar Batch</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
