import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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
floor.name = "FLOOR";
scene.add(floor);

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
boxMesh.receiveShadow = true;
boxMesh.position.y = 0.5;
// scene.add(boxMesh);

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

const gltfLoader = new GLTFLoader();
const gltf = await gltfLoader.loadAsync("/dancer.glb");
const character = gltf.scene;
const animationClips = gltf.animations;

character.position.y = 0.8;
character.scale.set(0.01, 0.01, 0.01);
// 캐릭터의 모든 메시에 그림자 효과 적용
character.traverse((obj) => {
  if (obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
});
scene.add(character);

const mixer = new THREE.AnimationMixer(character);
const action = mixer.clipAction(animationClips[3]);
action.setLoop(THREE.LoopPingPong); // LoopPingPong : 좌우로 왔다갔다 함
action.play();

// setTimeout(() => {
//   mixer.clipAction(animationClips[3]).paused = true;
// }, 5000);

// OrbitControls
const orbitControls = new OrbitControls(camera, renderer.domElement); // OrbitControls를 사용하면 마우스로 카메라를 조작할 수 있음
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.03;

const newPosition = new THREE.Vector3(0, 1, 0);
const rayCaster = new THREE.Raycaster();

renderer.domElement.addEventListener("pointerdown", (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -((e.clientY / window.innerHeight) * 2 - 1);

  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);
  const intersects = rayCaster.intersectObjects(scene.children); // 캐릭터와 충돌한 객체를 반환
  // console.log(intersects);

  const intersectFloor = intersects.find((i) => i.object.name === "FLOOR");
  console.log("intersectFloor", intersectFloor);
  newPosition.copy(intersectFloor.point);
  newPosition.y = 1;
});

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // camera의 속성이 변경된 경우, 호출해야지 내용 반영됨
  renderer.render(scene, camera);
});

const clock = new THREE.Clock();
const targetVector = new THREE.Vector3();

const render = () => {
  character.lookAt(newPosition);
  targetVector
    .subVectors(newPosition, character.position)
    .normalize()
    .multiplyScalar(0.01);

  if (
    Math.abs(character.position.x - newPosition.x) >= 1 ||
    Math.abs(character.position.z - newPosition.z) >= 1
  ) {
    character.position.x += targetVector.x;
    character.position.z += targetVector.z;
    action.stop();
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  orbitControls.update();
  if (mixer) {
    mixer.update(clock.getDelta());
  }
  action.play();
};

render();
