import Image from 'next/image';
import { Children, Fragment, useEffect, useRef, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import CustomModal from './CustomModal';
import Truncate from './Truncate';
import YoutubeEmbed from './YoutubeEmbed';

export default function Hero({ movie, h }) {
    const movieContentRef = useRef(null);
    const overviewContentRef = useRef(null);
    const [showLess, setShowLess] = useState(true);
    const [open, setOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const { windowSize } = useWindowSize()

    const handleShowLess = () => {
        setShowLess(false);
    }

    //console.log(overviewContentRef)
    //console.log(showLess)

    useEffect(() => {
        setHeight(movieContentRef.current.clientHeight)
    }, [windowSize.width, showLess]);

    useEffect(() => {
        return function cleanup() {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleModal = () => {
        if (open) {
            setOpen(false);
            document.body.style.overflow = 'unset';
        } else {
            setOpen(true);
            document.body.style.overflow = 'hidden';
        }
    }

    const AddSeparators = ({ children, separator = ' , ' }) =>
        Children.map(children, (child, idx) => (
            <Fragment>
                {idx ? separator : ''}{child}
            </Fragment>
        ));

    return (
        <div className=''>
            {
                movie.trailer.results &&
                <CustomModal open={open} onClose={handleModal}>
                    <YoutubeEmbed trailer={movie.trailer} />
                </CustomModal>
            }

            <div className='text-gray-200 -mt-10'>
                <div style={height !== 0 ? { height: `${height}px` } : { height: `${h}vh` }} className='relative '>

                    <div className='absolute z-10 w-full max-w-[1000px] h-full bg-gradient-to-r from-[#111111] to-transparent'></div>
                    <div className='absolute z-10 right-0 w-full max-w-[500px] h-full bg-gradient-to-l from-[#111111] to-transparent'></div>
                    <div className='absolute z-10 bottom-0 w-full h-full max-h-[500px] bg-gradient-to-t from-[#111111] to-transparent'></div>

                    <div ref={movieContentRef} className='absolute z-20 px-5 py-32 sm:py-56 sm:px-10 flex flex-col justify-center items-start w-full space-y-2'>

                        <div className='flex flex-wrap items-center gap-3'>
                            <span className='flex justify-center items-center gap-1 uppercase font-thin border border-solid border-yellow-600 text-yellow-500 px-2 rounded-md text-sm'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {movie.data.vote_average}
                            </span>
                            <span className='uppercase font-thin border border-solid border-gray-500 px-2 rounded-md text-sm'>{movie.data.original_language}</span>
                            <span className='font-thin border border-solid border-gray-500 px-2 rounded-md text-sm'>{movie.data.release_date}</span>
                            <div className='font-thin text-sm flex flex-wrap gap-1'>
                                <AddSeparators separator={`\u2022`}>
                                    {
                                        movie.data.genres.map((genre, index) => (
                                            <h1 key={index}>{genre.name}</h1>
                                        ))
                                    }
                                </AddSeparators>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <h1 className='font-semibold text-2xl sm:text-5xl drop-shadow-md'>{movie.data.original_title}</h1>
                            <Truncate showLess={showLess} handleShowLess={handleShowLess} reff={overviewContentRef} text={movie.data.overview} length={150} />

                            <div className='flex gap-2 flex-wrap'>
                                {
                                    movie.trailer.results?.length !== 0 &&
                                    <button onClick={() => { setOpen(true); document.body.style.overflow = 'hidden'; }} className="relative w-auto px-4 py-2 group overflow-hidden font-semibold text-sm bg-red-600 text-gray-100 flex justify-center items-center gap-2">
                                        <span className="absolute top-0 left-0 flex h-full w-0 mb-0 transition-all duration-300 ease-out bg-black group-hover:w-full opacity-100"></span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="relative h-5 w-5 group-hover:text-white" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" />
                                        </svg>
                                        <span className=" relative group-hover:text-white">Watch trailer</span>
                                    </button>
                                }
                                <button className="relative w-auto px-4 py-2 group overflow-hidden font-semibold text-sm bg-black text-gray-100 flex justify-center items-center gap-2">
                                    <span className="absolute top-0 left-0 flex h-full w-0 mb-0 transition-all duration-300 ease-out bg-[#0c0c0c] group-hover:w-full opacity-100"></span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="relative h-5 w-5 group-hover:text-red-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    <span className="relative transition duration-500 ease-out bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-l group-hover:from-red-400 group-hover:to-red-700">
                                        Add to watchlist
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <img

                        className='w-full object-cover object-top h-full'
                        src={`https://image.tmdb.org/t/p/original/${movie.data.backdrop_path}`}
                        alt={movie.data.original_title}
                    />
                </div>
                <div className='flex flex-wrap justify-center items-center w-full px-5 sm:px-10'>
                    {
                        movie.data.production_companies.map((company, index) => (
                            company.logo_path !== null &&
                            <div key={index} className='p-5'>
                                {/* <h1>{company.name}</h1> */}
                                <img className={`max-h-8 w-full object-contain`}
                                    src={`https://image.tmdb.org/t/p/original/${company.logo_path}`}
                                    alt={company.name}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    );
}
