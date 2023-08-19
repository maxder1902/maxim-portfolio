import * as THREE from "three";

import Experience from "../Experience.js";

import GSAP from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger.js";


export default class Room {
    constructor(){

        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();
        
    }



    setScrollTrigger(){
        ScrollTrigger.matchMedia({

	
            // Desktop
            "(min-width: 969px)": () => {

                console.log("Fired Desktop");

                this.room.scale.set(0.03, 0.03, 0.03);
                


                //First section -------------------------------------- -- -- - -- -
                this.firstMoveTimeline = new GSAP.timeline({ 

                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }

                });

                this.firstMoveTimeline.to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * 0.0014;
                    }
                });
                
                //Second section -------------------------------------- -- -- - -- -
                this.secondMoveTimeline = new GSAP.timeline({ 

                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }

                });

                this.secondMoveTimeline.to(this.room.position, {
                    x: ()=>{
                        return this.sizes.width * -0.0024;
                    },

                });

                    //Third section -------------------------------------- -- -- - -- -
                    this.thirdMoveTimeline = new GSAP.timeline({ 

                        scrollTrigger:{
                            trigger: ".third-move",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                            invalidateOnRefresh: true,
                        }

                    });

                    this.thirdMoveTimeline.to(this.room.position, {
                        x: ()=>{
                            return this.sizes.width * 0.0014;
                        }
                    });
                
            },

            //Mobile
            "(max-width: 968px)": () => {

                console.log("Fired Mobile");

                //First section -------------------------------------- -- -- - -- -
                this.firstMoveTimeline = new GSAP.timeline({ 

                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }

                }).to(this.room.scale, {
                    x:0.1,
                    y:0.1,
                    z:0.1,
                }).to(this.room.position, {
                    x:-6,
                    y:-8,
                });


                //Second section -------------------------------------- -- -- - -- -
                this.secondMoveTimeline = new GSAP.timeline({ 

                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }

                });

                //Third section -------------------------------------- -- -- - -- -
                this.thirdMoveTimeline = new GSAP.timeline({ 

                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    }

                });


            

            },
              
            // all 
            "all": () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach(section => {
                    this.progressWrapper = section.querySelector(".progress-wrapper"); 
                    this.progressBar = section.querySelector(".progress-bar"); 

                    if ( section.classList.contains("right") ){

                        GSAP.to(section, {

                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            }

                        });

                        GSAP.to(section, {

                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            }

                        });

                    }else{

                        GSAP.to(section, {

                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            }

                        });

                        GSAP.to(section, {

                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            }

                        });

                    }
                    
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },

                    });
                });

            }
              
          }); 
    }


    resize(){

    }

    update(){

        
    }

}