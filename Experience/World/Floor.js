import * as THREE from "three";

import Experience from "../Experience.js";

import GSAP from "gsap";


export default class Floor {
    constructor(){

        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        
    }

    setFloor() {

        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0x1a4eb9,
        });

        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.position.set(0, 0, -10)
        console.log("La posicion del plano es: " + this.plane.position.x);
        this.scene.add(this.plane);
    }

    resize(){

    }

    update(){
        
    }
}