import { Children, Fragment, useEffect, useState, useRef } from 'react';
import useWindowMobile from '../hooks/useWindowMobile';
import Card from './Card';
import CastCard from './CastCard';

export default function Carousel({ data, type, title, cardHeight, cardWidth }) {
    const carouselRef = useRef(null);
    const isMobile = useWindowMobile()
    const [isHidden, setIsHidden] = useState(false)

    const [rightArrow, setRightArrow] = useState(false);
    const [leftArrow, setLeftArrow] = useState(false);
    const [scrollLeftPos, setScrollLeftPos] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        window.addEventListener('resize', setWidth(window.innerWidth));
        return () => window.removeEventListener('resize', setWidth(window.innerWidth));
    }, [width]);

    useEffect(() => {
        if (data.total_results !== 0 && carouselRef.current !== null) {
            if (carouselRef.current.clientWidth + scrollLeftPos >= carouselRef.current.scrollWidth && scrollLeftPos !== 0) {
                setRightArrow(true)
            } else {
                setRightArrow(false)
            }
            if (type === "Credits") {
                //console.log(data.cast.profile_path)
                let counter = 0;
                data?.cast?.map((el) => {
                    if (el.profile_path !== null) {
                        counter++;
                    }
                })
                if (cardWidth * counter < carouselRef.current.clientWidth) {
                    setIsHidden(true);
                    setScrollLeftPos(0)
                } else {
                    setIsHidden(false);
                }
            } else {
                let counter = 0;
                data?.results?.map((el) => {
                    if (el.backdrop_path !== null) {
                        counter++;
                    }
                })

                if (cardWidth * counter < carouselRef.current.clientWidth) {
                    setIsHidden(true);
                    setScrollLeftPos(0)
                } else {
                    setIsHidden(false);
                }
            }

            if (scrollLeftPos <= 0) {
                setLeftArrow(true)
            }
            if (scrollLeftPos > 0) {
                setLeftArrow(false)
            }
        }
    }, [scrollLeftPos, width, data, type]);

    const clientClick = (side) => {
        const visibleItemsOnScreen = Math.round(carouselRef.current?.clientWidth / (carouselRef.current?.scrollWidth / (type === "Credits" ? data.cast?.length : data.results?.length)));
        //console.log(visibleItemsOnScreen)
        if (side === "left") {
            scroll(-carouselRef.current.scrollWidth / (type === "Credits" ? data.cast?.length : data.results?.length) * visibleItemsOnScreen);
        }
        if (side === "right") {
            scroll(carouselRef.current.scrollWidth / (type === "Credits" ? data.cast?.length : data.results?.length) * visibleItemsOnScreen);
        }
    }

    const scroll = (scrollOffset) => {
        setScrollLeftPos(carouselRef.current.scrollLeft += scrollOffset)
    };

    const AddSeparators = ({ children, separator = ' , ' }) =>
        Children.map(children, (child, idx) => (
            <Fragment>
                {idx ? separator : ''}{child}
            </Fragment>
        ));

    useEffect(() => {
        if (carouselRef.current !== null) {
            const handleScrolling = () => {
                setScrollLeftPos(scrollLeftPos + carouselRef.current.scrollLeft)
                //console.log("aaa",scrollLeftPos + ref.current.scrollLeft)
            }
            carouselRef.current.addEventListener('scroll', handleScrolling);
            return () => carouselRef.current?.removeEventListener('scroll', handleScrolling);
        }
    }, []);

    return (
        data.total_results !== 0 &&
        <div className='py-4'>
            <div className={`pb-2 gap-2 text-red-600 flex items-center px-5 sm:px-10`}>
                <AddSeparators separator=' | '>
                    <h1 className={`text-xl text-gray-200 `}>{title}</h1>
                    {
                        (data.total_pages > 1) &&
                        <a className='flex items-center gap-2 cursor-pointer text-xl font-extralight text-gray-200 hover:text-red-600 '>
                            Watch all
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    }
                </AddSeparators>
            </div>
            <div className={`transition duration-1000 transform ${leftArrow && "pl-3 sm:pl-8"} ${rightArrow && "pr-5 -ml-5 sm:pr-10 sm:-ml-10"}`}>


                <div className={`relative h-full w-full flex items-center`}>

                    <button onClick={() => clientClick("left")}
                        style={{ height: `${cardHeight}px` }} className={`${leftArrow && "hidden"} ${rightArrow && "pl-20"} ${isMobile && "hidden"} p-10 z-20 left-0 flex justify-center items-center absolute rounded-r bg-gradient-to-r from-black to-transparent`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    {
                        !isHidden &&
                        <button onClick={() => clientClick("right")}
                            style={{ height: `${cardHeight}px` }} className={`${rightArrow && "hidden"} ${isMobile && "hidden"} p-10  z-20 right-0 flex justify-end items-center absolute bg-gradient-to-l from-black to-transparent`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    }
                    <div ref={carouselRef} className={`flex overflow-x-scroll overflow-y-hidden scroll-smooth space-x-2 px-2 `}>
                        {
                            type === "Credits" ?
                                data.cast?.map((obj, index) => (
                                    obj.profile_path !== null &&
                                    <CastCard key={index} data={obj} w={cardWidth} h={cardHeight} />
                                ))
                                :
                                data.results?.map((obj, index) => (
                                    (obj.backdrop_path !== null || obj.poster_path !== null) ?
                                        <Card key={index} data={obj} w={cardWidth} h={cardHeight} />
                                        : <h1>Loading</h1>
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
