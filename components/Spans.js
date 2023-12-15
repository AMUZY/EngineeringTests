'use client'
import React, { useEffect } from 'react'
import Image from "next/image"
import Aos from 'aos';
import '../node_modules/aos/dist/aos.css'; // You can also use <link> for styles

var aos_right = "fade-right"
var aos_left = "fade-left"
var aos_dur = "1200"
var aos_once = "false"

const Spans = () => {
    useEffect(()=>{
        const hiddenelements = document.querySelectorAll('.hide');
        const otherelements = document.querySelectorAll('.other');
        const spans = document.querySelectorAll('.span');
        const spans2 = document.querySelectorAll('.span_second');
    
        const observer = new IntersectionObserver((items)=>{   
            items.forEach((item) => {
                if(item.isIntersecting){
                    item.target.classList.add('show')
                }
                else{
                    item.target.classList.remove('show')
                }
            });
        });
    
        hiddenelements.forEach((item)=> observer.observe(item));
        otherelements.forEach((item)=> observer.observe(item));
        spans.forEach((item)=> observer.observe(item));
        spans2.forEach((item)=> observer.observe(item));

        Aos.init({
            // Global settings:
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
            
          
            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 400, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
          
        });
    },[])


  return (
    <>
        <div style={{backgroundColor : 'rgb(255,255,255)'}} className='section relative overflow-hidden'>
            <div className='mb-32'>
                {/* MOVING SPANS */}
                <div className='z-[-1] w-full h-1/2'>
                    <div className='animespans1 ml-[60%] '>
                        <span className='span span-1'></span>
                        <span className='span span-2'></span>
                        <span className='span span-3'></span>
                        <span className='span span-4'></span>
                    </div>
                </div>

                <div data-aos-duration={aos_dur} data-aos={aos_right} data-aos-delay="50" data-aos-once= {aos_once}>
                    <Image className='mr-4 md:mr-10' src = '/assets/svgs/cart.svg' width={100} height={100} alt='cart' />
                </div>
                <div data-aos-duration={aos_dur} data-aos={aos_right} data-aos-delay="50" data-aos-once= {aos_once} className='rounded-xl p-2 mb-8 bg-[rgba(255,255,255,0.5)] lg:bg-transparent'>
                    <h2 className='tsubtitle'> Mechanical Tests </h2>
                    <p className='tbase mb-3'> A variety of mechanical test charts available </p>
                </div>
                <div className='gridcont w-full md:w-[60%]'>
                    <div data-aos-duration={aos_dur} data-aos={aos_right} data-aos-delay="50" data-aos-once= {aos_once}><Image src='/assets/svgs/tensile.svg' width={65} height={60} alt='tensile icon' /><h2 className='tbase text-center mt-2'> Tensile Test </h2></div>
                    <div data-aos-duration={aos_dur} data-aos={aos_right} data-aos-delay="150" data-aos-once= {aos_once}><Image src='/assets/svgs/hardness.svg' width={65} height={60} alt='tensile icon' /><h2 className='tbase text-center mt-2'> Hardness Test </h2></div>
                    <div data-aos-duration={aos_dur} data-aos={aos_right} data-aos-delay="250" data-aos-once= {aos_once}><Image src='/assets/svgs/impact.svg' width={65} height={60} alt='tensile icon' /><h2 className='tbase text-center mt-2'> Impact Test </h2></div>
                    <div data-aos-duration={aos_dur} data-aos={aos_right} data-aos-delay="350" data-aos-once= {aos_once}><Image src='/assets/svgs/flexural.svg' width={65} height={60} alt='tensile icon' /><h2 className='tbase text-center mt-2'> Flexural Test </h2></div>
                </div>
            </div>


            <div className='flex flex-col lg:flex-row'>
                <div className='z-[2] w-full flex flex-row justify-end items-center lg:translate-x-[-50%] xl:translate-x-0 lg:order-2'>
                    <div className='w-full md:ml-0 xl:ml-32'>
                        <div data-aos-duration={aos_dur} data-aos={aos_left} data-aos-delay="50" data-aos-once= {aos_once}>
                            <Image className='mr-4 md:mr-10' src = '/assets/svgs/search.svg' width={100} height={100} alt='cart' />
                        </div>
                        <div data-aos-duration={aos_dur} data-aos={aos_left} data-aos-delay="50" data-aos-once= {aos_once} className='rounded-xl p-2 mb-8 bg-[rgba(255,255,255,0.5)] xl:bg-transparent'>
                            <h2 className='tsubtitle'> Ease of Search </h2>
                            <p className='tbase mb-3 mr-0 xl:w-[70%]'> Find your charts easily by searching for type of tests, date of creation, name of x and y axes or chart title </p>
                        </div>
                        <div className='w-full'>
                            <Image data-aos-duration={aos_dur} data-aos={aos_left} data-aos-delay="50" data-aos-once= {aos_once} src = '/assets/svgs/charts.svg' width={740} height={440} alt='charts'/>
                        </div>
                    </div>
                </div>
                {/* MOVING SPANS 2 */}
                <div className='hidden w-full lg:block lg:w-1/2'>
                    <div className='animespans2'>
                        <span className='span_second span-1'></span>
                        <span className='span_second span-2'></span>
                        <span className='span_second span-3'></span>
                        <span className='span_second span-4'></span>
                        <span className='span_second span-5'></span>
                        <span className='span_second span-6'></span>
                        <span className='span_second span-7'></span>
                    </div>
                </div>
            </div>
            
        </div>
    </>
    
  )
}

export default Spans