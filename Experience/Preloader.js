import * as THREE from "three";

import { EventEmitter } from "events";

import Experience from "./Experience";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default class Preloader extends EventEmitter {
    constructor(){
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.world = this.experience.world;

        this.world.on("worldready", () => {
            this.playIntro();
        });

    }

    playIntro(){

        this.manager = new THREE.LoadingManager();
        this.manager.onStart = function (url, itemsLoaded, itemsTotal){

            console.log("loading shits: " + url);

        }

         
    }
}