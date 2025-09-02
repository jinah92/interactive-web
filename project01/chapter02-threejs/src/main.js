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
camera.position.z = 8; // 카메라의 위치를 mesh 위치로부터 5만큼 떨어지게 설정

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

const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  side: THREE.FrontSide,
});
const frontMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontMesh.position.z = 4;
frontMesh.position.y = 0.5;
frontMesh.castShadow = true;
frontMesh.receiveShadow = true;
scene.add(frontMesh);

const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.BackSide,
});
const backMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
backMesh.position.set(2, 0.5, 4);
backMesh.position.y = 0.51;
backMesh.receiveShadow = true;
scene.add(backMesh);

const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
doubleSideMesh.position.set(4, 0.5, 4);
doubleSideMesh.position.y = 0.51;
doubleSideMesh.receiveShadow = true;
scene.add(doubleSideMesh);

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);
const torusKnotMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
torusKnotMaterial.roughness = 0.5;
torusKnotMaterial.metalness = 1;
const torusKnotMesh = new THREE.Mesh(torusKnotGeometry, torusKnotMaterial);
torusKnotMesh.castShadow = true;
torusKnotMesh.receiveShadow = true;
torusKnotMesh.position.set(-4, 1, 0);
scene.add(torusKnotMesh);

const torusKnotLambertMaterial = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
torusKnotLambertMaterial.emissive = new THREE.Color(0x0000ff);
const torusKnotLambertMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotLambertMaterial
);
torusKnotLambertMesh.castShadow = true;
torusKnotLambertMesh.receiveShadow = true;
torusKnotLambertMesh.position.set(-2, 1, 0);
scene.add(torusKnotLambertMesh);

const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotPhongMaterial.emissiveIntensity = 0.2;
torusKnotPhongMaterial.specular = new THREE.Color(0x0000ff);
torusKnotPhongMaterial.shininess = 100;
const torusKnotPhongMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotPhongMaterial
);
torusKnotPhongMesh.castShadow = true;
torusKnotPhongMesh.receiveShadow = true;
torusKnotPhongMesh.position.set(0, 1, 0);
scene.add(torusKnotPhongMesh);

const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const torusKnotBasicMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotBasicMaterial
);
torusKnotBasicMesh.castShadow = true;
torusKnotBasicMesh.receiveShadow = true;
torusKnotBasicMesh.position.set(2, 1, 0);
scene.add(torusKnotBasicMesh);

const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({ color: 0xffffff });
torusKnotDepthMaterial.opacity = 0.5;
const torusKnotDepthMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotDepthMaterial
);
torusKnotDepthMesh.castShadow = true;
torusKnotDepthMesh.receiveShadow = true;
torusKnotDepthMesh.position.set(4, 1, 0);
scene.add(torusKnotDepthMesh);

// const geometry = new THREE.BoxGeometry(1, 1, 1); // 가로, 세로, 높이가 1인 box
// const material = new THREE.MeshStandardMaterial({ color: "red" });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.castShadow = true;
// mesh.position.y = 0.5;
// scene.add(mesh);

// const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
// const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
// const capsule = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
// capsule.position.set(3, 1.75, 0);
// capsule.castShadow = true;
// capsule.receiveShadow = true;
// scene.add(capsule);

// const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2);
// const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
// const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
// cylinder.position.set(-3, 1, 0);
// cylinder.castShadow = true;
// cylinder.receiveShadow = true;
// scene.add(cylinder);

// const torusGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
// const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
// const torus = new THREE.Mesh(torusGeometry, torusMaterial);
// torus.position.set(0, 0.5, 1);
// torus.castShadow = true;
// torus.receiveShadow = true;
// scene.add(torus);

// const starShape = new THREE.Shape();
// starShape.moveTo(0, 1);
// starShape.lineTo(0.2, 0.2);
// starShape.lineTo(1, 0.2);
// starShape.lineTo(0.4, -0.1);
// starShape.lineTo(0.6, -1);
// starShape.lineTo(0, -0.5);
// starShape.lineTo(-0.6, -1);
// starShape.lineTo(-0.4, -0.1);
// starShape.lineTo(-1, 0.2);
// starShape.lineTo(-0.2, 0.2);

// const shapeGeometry = new THREE.ShapeGeometry(starShape);
// const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
// const shape = new THREE.Mesh(shapeGeometry, shapeMaterial);
// shape.position.set(0, 1, 2);
// scene.add(shape);

// const extrudeSettings = {
//   steps: 1, // 값이 클수록 부드러움
//   depth: 0.1, // 두께
//   bevelEnabled: true, // 베벨을 사용하면 모서리가 둥근 형태로 표현됨
//   bevelThickness: 0.1, // 베벨의 두께
//   bevelSize: 0.2, // 베벨(모서리)의 크기
//   bevelSegments: 1, // 베벨의 세그먼트 수
// };

// const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
// const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x0ddaaf });
// const extrude = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
// extrude.position.set(2, 1.3, 2);
// extrude.castShadow = true;
// extrude.receiveShadow = true;
// scene.add(extrude);

// const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
// const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x98daaf });
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// sphere.position.set(0, 1, -3);
// scene.add(sphere);

// const numPoints = 1000;
// const positions = new Float32Array(numPoints * 3);

// for (let i = 0; i < numPoints; i++) {
//   const x = (Math.random() - 0.5) * 1;
//   const y = (Math.random() - 0.5) * 1;
//   const z = (Math.random() - 0.5) * 1;

//   positions[i * 3] = x;
//   positions[i * 3 + 1] = y;
//   positions[i * 3 + 2] = z;
// }

// const bufferGeometry = new THREE.BufferGeometry();
// bufferGeometry.setAttribute(
//   "position",
//   new THREE.BufferAttribute(positions, 3)
// );

// const pointsMaterial = new THREE.PointsMaterial({
//   color: 0xffff00,
//   size: 0.05,
// });

// const point = new THREE.Points(bufferGeometry, pointsMaterial);
// point.position.set(0, 0, -5);
// scene.add(point);

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
