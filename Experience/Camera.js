import * as THREE from "three";

import Experience from "./Experience.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
    constructor(){

        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.CreatePerspectiveCamera();
        this.CreateOrtographicCamera();
        this.setOrbitControls();

    }
    CreatePerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.x = -9;
        this.perspectiveCamera.position.y = 4;
        this.perspectiveCamera.position.z = -21;

    }

    CreateOrtographicCamera() {
        this.ortographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2,
            -50,
            50
        );

        this.ortographicCamera.position.z = -2;
        this.ortographicCamera.position.y = 3;
        this.ortographicCamera.rotation.x = Math.PI / 6;


        this.scene.add(this.ortographicCamera);
        //this.helper = new THREE.CameraHelper(this.ortographicCamera);
        //this.scene.add(this.helper);

        const size = 20;
        const divisions = 20;

        //const gridHelper = new THREE.GridHelper( size, divisions );
        //this.scene.add( gridHelper );

        /*const axesHelper = new THREE.AxesHelper( 5 );
        this.scene.add( axesHelper ); */


        this.scene.add(this.ortographicCamera);
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
        
    }
    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.ortographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2 ;
        this.ortographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2 ;
        this.ortographicCamera.top = this.sizes.frustrum/2;
        this.ortographicCamera.bottom = -this.sizes.frustrum/2;

    }

    update() {


        this.controls.update();
         
        /*this.helper.matrixWorldNeedsUpdate = true;
        this.helper.update();
        this.helper.position.copy(this.ortographicCamera.position);
        this.helper.rotation.copy(this.ortographicCamera.rotation);

        */
    }
}