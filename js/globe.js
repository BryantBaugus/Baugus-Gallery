export async function initGlobe(container, projects, { onPinClick }) {
  const THREE = await import('three');
  const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

  const width = container.clientWidth || 800;
  const height = container.clientHeight || 760;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#f4efe3');
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 3.1);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  controls.enablePan = false;
  controls.minDistance = 1.04;
  controls.maxDistance = 5;
  controls.zoomSpeed = 1.2;
  controls.addEventListener('start', () => { controls.autoRotate = false; });

  const fill = new THREE.Mesh(new THREE.SphereGeometry(0.985, 48, 32), new THREE.MeshBasicMaterial({ color: '#dbe2cd' }));
  scene.add(fill);
  const grid = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 16), new THREE.MeshBasicMaterial({ color: '#6f6a5c', wireframe: true, transparent: true, opacity: 0.18 }));
  scene.add(grid);

  const latLngToVec3 = (lat, lng, r) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
  };

  const coastlineGroup = new THREE.Group();
  scene.add(coastlineGroup);
  try {
    const topoResp = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json');
    const topology = await topoResp.json();
    const geo = window.topojson.feature(topology, topology.objects.countries);
    const lineMat = new THREE.LineBasicMaterial({ color: '#4a463c', transparent: true, opacity: 0.8 });
    geo.features.forEach(f => {
      const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : (f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : []);
      polys.forEach(poly => {
        poly.forEach(ring => {
          const pts = ring.map(([lng, lat]) => latLngToVec3(lat, lng, 1.002));
          const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
          coastlineGroup.add(new THREE.LineLoop(lineGeo, lineMat));
        });
      });
    });

    const statesResp = await fetch('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json');
    const statesTopo = await statesResp.json();
    const statesGeo = window.topojson.feature(statesTopo, statesTopo.objects.states);
    const stateMat = new THREE.LineBasicMaterial({ color: '#8a3d29', transparent: true, opacity: 0.7 });
    statesGeo.features.forEach(f => {
      const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : (f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : []);
      polys.forEach(poly => {
        poly.forEach(ring => {
          const pts = ring.map(([lng, lat]) => latLngToVec3(lat, lng, 1.003));
          const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
          coastlineGroup.add(new THREE.LineLoop(lineGeo, stateMat));
        });
      });
    });
  } catch (e) {
    // offline / CDN unreachable — globe still renders with fill + pins, just without coastline overlay
  }

  const colorMap = { Professional: '#8a3d29', Academic: '#4f5c40', Research: '#4f6d7a' };
  const pinMeshes = [];
  projects.forEach(p => {
    const phi = (90 - p.lat) * (Math.PI / 180);
    const theta = (p.lng + 180) * (Math.PI / 180);
    const r = 1.004;
    const x = -r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.cos(phi);
    const z = r * Math.sin(phi) * Math.sin(theta);
    const pin = new THREE.Mesh(new THREE.SphereGeometry(0.011, 10, 10), new THREE.MeshBasicMaterial({ color: colorMap[p.category] || '#8a3d29' }));
    pin.position.set(x, y, z);
    pin.userData.project = p;
    scene.add(pin);
    pinMeshes.push(pin);
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const onClick = (ev) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(pinMeshes);
    if (hits.length) {
      onPinClick(hits[0].object.userData.project);
    }
  };
  renderer.domElement.addEventListener('click', onClick);

  let raf = null;
  const animate = () => {
    raf = requestAnimationFrame(animate);
    controls.update();
    const dist = camera.position.distanceTo(controls.target);
    const s = THREE.MathUtils.clamp(dist / 2.6, 0.3, 1.2);
    pinMeshes.forEach(p => p.scale.setScalar(s));
    controls.rotateSpeed = THREE.MathUtils.clamp(dist / 3.1, 0.12, 1);
    controls.panSpeed = controls.rotateSpeed;
    renderer.render(scene, camera);
  };
  animate();

  return {
    destroy() {
      if (raf) cancelAnimationFrame(raf);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
  };
}
