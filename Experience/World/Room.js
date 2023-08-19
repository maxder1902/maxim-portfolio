import * as THREE from "three";

import Experience from "../Experience.js";

import GSAP from "gsap";

import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";


export default class Room {
    constructor(){

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        
        this.setModel();
        this.onMouseMove();
        
    }

    setModel(){
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if ( child instanceof THREE.Group ){
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;

                });
            }

            /*//Change textures
            if ( child.name === "algo"  ){
                //Commands for changing the texture of the material 
            } */

            


        });

        const width = 3;
        const height = 5;
        const intensity = 3;
        const rectLight = new THREE.RectAreaLight( 0x4f2358, intensity,  width, height );
        rectLight.position.set( 0, 7, 0 );
        rectLight.rotation.z = Math.PI / 4;
        this.actualRoom.add( rectLight );

        const rectLightHelper = new RectAreaLightHelper( rectLight );
        //rectLight.add( rectLightHelper );

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.03, 0.03, 0.03);
        this.actualRoom.rotation.y = Math.PI;
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) =>{
            console.log(e);
            this.rotation = ((e.clientX - window.innerWidth / 2)) * 2 / window.innerWidth ;
            this.lerp.target = this.rotation;

            console.log(e.clientX, this.rotation);
        });
    }

    resize(){

    }

    update(){

        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease,
        );

        this.actualRoom.rotation.y = this.lerp.current;
        
    }
}