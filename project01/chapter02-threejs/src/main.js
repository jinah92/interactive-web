import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias: true를 설정하면 렌더링 결과가 더 부드러워짐
renderer.shadowMap.enabled = true; // shadowMap을 사용하면 그림자를 표현할 수 있음
renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러의 크기를 브라우저 크기에 맞게 설정
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

camera.position.y = 1; // 카메라의 위치를 y축 1만큼 위로 설정
camera.position.z = 5; // 카메라의 위치를 mesh 위치로부터 5만큼 떨어지게 설정

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // 플로어의 회전을 조절하여 플로어가 바닥이 되도록 설정
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const geometry = new THREE.BoxGeometry(1, 1, 1); // 가로, 세로, 높이가 1인 box
const material = new THREE.MeshStandardMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
mesh.castShadow = true;
mesh.position.y = 0.5;
scene.add(mesh);

const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsule.position.set(3, 1.75, 0);
capsule.castShadow = true;
capsule.receiveShadow = true;
scene.add(capsule);

const orbitControls = new OrbitControls(camera, renderer.domElement); // OrbitControls를 사용하면 마우스로 카메라를 조작할 수 있음
orbitControls.update();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // camera의 속성이 변경된 경우, 호출해야지 내용 반영됨
  renderer.render(scene, camera);
});

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();
