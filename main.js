import * as THREE from 'three';

const setSize = {
    width: window.innerWidth,
    height: window.innerHeight
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, setSize.width / window.height, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
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

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    boxMesh.rotation.x += 0.01;
    boxMesh.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();