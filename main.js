import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const setSize = {
    width: window.innerWidth,
    height: window.innerHeight
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, setSize.width / setSize.height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(setSize.width, setSize.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

function onWindowResize() {
    setSize.width = window.innerWidth;
    setSize.height = window.innerHeight;

    camera.aspect = setSize.width / setSize.height;
    camera.updateProjectionMatrix();

    renderer.setSize(setSize.width, setSize.height);
}

window.addEventListener('resize', onWindowResize, false);


const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);

// ----- simple forward/backward controls for the mesh -----
// Use W / ArrowUp to move forward (in the camera's forward direction)
// Use S / ArrowDown to move backward
const clock = new THREE.Clock();
const moveSpeed = 5; // units per second
const keys = { forward: false, backward: false };

window.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') keys.forward = true;
    if (e.key === 's' || e.key === 'ArrowDown') keys.backward = true;
});

window.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') keys.forward = false;
    if (e.key === 's' || e.key === 'ArrowDown') keys.backward = false;
});


// place camera at a sensible default. We set it once below instead of twice.

const controls = new OrbitControls(camera, renderer.domElement);
// controls.update() must be called after any manual changes to the camera's transform
camera.position.set(0, 0, 5);
controls.update();
function animate() {
    // apply movement based on keys and elapsed time
    const delta = clock.getDelta();
    if (keys.forward || keys.backward) {
        const dir = new THREE.Vector3();
        camera.getWorldDirection(dir); // unit vector pointing forward from camera
        const sign = keys.forward ? 1 : (keys.backward ? -1 : 0);
        // move the mesh along the camera forward/backward direction
        boxMesh.position.add(dir.multiplyScalar(sign * moveSpeed * delta));
    }

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);