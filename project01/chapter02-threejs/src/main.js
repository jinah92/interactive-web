import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias: true를 설정하면 렌더링 결과가 더 부드러워짐
renderer.shadowMap.enabled = true; // shadowMap을 사용하면 그림자를 표현할 수 있음

renderer.shadowMap.type = THREE.BasicShadowMap; // 품질이 가장 낮은 shadowMap 타입 (성능 우수)
renderer.shadowMap.type = THREE.PCFShadowMap; // 품질이 중간 shadowMap 타입 (성능 중간)
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 품질이 높은 shadowMap 타입 (성능 낮음)

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
camera.position.z = 8; // 카메라의 위치를 mesh 위치로부터 5만큼 떨어지게 설정

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xbbbbbb,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // 플로어의 회전을 조절하여 플로어가 바닥이 되도록 설정
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
scene.add(boxMesh);

// directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
directionalLight.shadow.mapSize.width = 4096; // 그림자 너비
directionalLight.shadow.mapSize.height = 4096; // 그림자 높이

// 그림자 범위 제어 (top, bottom, left, right)
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;

// 그림자 거리 제어 (near, far)
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;

scene.add(directionalLight);
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1
);
scene.add(directionalLightHelper);

// OrbitControls
// const orbitControls = new OrbitControls(camera, renderer.domElement); // OrbitControls를 사용하면 마우스로 카메라를 조작할 수 있음
// orbitControls.enableDamping = true;
// orbitControls.dampingFactor = 0.03;
// orbitControls.enableZoom = true;
// orbitControls.autoRotate = false;
// orbitControls.enablePan = true;
// orbitControls.enableRotate = true;
// orbitControls.autoRotateSpeed = 2; // default : 2

// // 카메라 수직 이동반경 제한
// orbitControls.maxPolarAngle = Math.PI / 2;
// orbitControls.minPolarAngle = Math.PI / 4;
// // 카메라 수평 이동반경 제한
// orbitControls.maxAzimuthAngle = Math.PI / 2;
// orbitControls.minAzimuthAngle = -Math.PI / 2;

// FlyControls
// const flyControls = new FlyControls(camera, renderer.domElement);
// flyControls.movementSpeed = 1;
// flyControls.rollSpeed = Math.PI / 10;
// flyControls.autoForward = false;

camera.position.set(0, 1, 5);

// FirstPersonControls
// const firstPersonControls = new FirstPersonControls(
//   camera,
//   renderer.domElement
// );
// firstPersonControls.lookSpeed = 0.1; // 카메라 회전속도
// firstPersonControls.movementSpeed = 1; // 카메라 이동속도
// firstPersonControls.lookVertical = false; // 카메라 수직이동 여부

// PointerLockControls
// const pointerLockControls = new PointerLockControls(
//   camera,
//   renderer.domElement
// );
// window.addEventListener("click", () => {
//   pointerLockControls.lock();
// });

// TrackballControls
const trackballControls = new TrackballControls(camera, renderer.domElement);
trackballControls.rotateSpeed = 2;
trackballControls.zoomSpeed = 1.5;
trackballControls.panSpeed = 0.5;
trackballControls.noRotate = false;
trackballControls.noZoom = false;
trackballControls.noPan = false;
trackballControls.staticMoving = false;
trackballControls.dynamicDampingFactor = 0.05;

const target = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
target.position.set(4, 0.5, 0);
scene.add(target);
trackballControls.target = target.position;

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // camera의 속성이 변경된 경우, 호출해야지 내용 반영됨
  renderer.render(scene, camera);
});

const clock = new THREE.Clock();
const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  // orbitControls.update();
  // flyControls.update(clock.getDelta());
  // firstPersonControls.update(clock.getDelta());
  trackballControls.update();
  textureMesh.rotation.y += 0.01;
};

render();
