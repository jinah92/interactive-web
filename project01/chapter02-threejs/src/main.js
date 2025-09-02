import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);

const geometry = new THREE.BoxGeometry(1, 1, 1); // 가로, 세로, 높이가 1인 box
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.y = 1; // 카메라의 위치를 y축 1만큼 위로 설정
camera.position.z = 5; // 카메라의 위치를 mesh 위치로부터 5만큼 떨어지게 설정

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러의 크기를 브라우저 크기에 맞게 설정
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // camera의 속성이 변경된 경우, 호출해야지 내용 반영됨
  renderer.render(scene, camera);
});

renderer.render(scene, camera);
