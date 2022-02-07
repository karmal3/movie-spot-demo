import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
    const [show, handleShow] = useState(false);
    const [searchOpen, setSearchOpen] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter()

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, []);

    const transitionNavBar = () => {
        if (window.scrollY > 20) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    const searchClick = () => {
        setSearchOpen(!searchOpen);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (searchQuery) {
                router.push(`/search/${searchQuery}/?page=1`);
                setSearchOpen(false);
            }
        }
    }

    return (
        <div className={`px-5 sm:px-10 py-4 text-gray-50 fixed flex justify-between items-center w-full z-50 ${show && 'backdrop-filter backdrop-blur-md bg-[#111111] bg-opacity-50'} ease-in transition-all`}>
            <div className={`flex items-center gap-4 ${searchOpen && "w-full sm:w-auto"}`}>

                <div className={`${searchOpen && "hidden sm:block"}`}>
                    <Link href='/' passHref>
                        <a className="cursor-pointer outline-none hover:text-red-600 transition duration-300 ease-out flex">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </a>
                    </Link>
                </div>

                <div className={`flex items-center cursor-pointer ${searchOpen && "w-full border-red-600 border-b"}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 m-1 text-white ${searchOpen ? "text-red-600" : "hover:text-red-600"}`} onClick={searchClick} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    {searchOpen &&
                        <>
                            <input autoFocus className="px-2 font-thin bg-transparent outline-none"
                                type="text"
                                onKeyDown={handleKeyDown}
                                onBlur={() => setSearchOpen(false)}

                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search movies, tv shows..."
                            />
                            <button onClick={(e) => handleSearch(e)} type="submit"></button>
                        </>
                    }
                </div>
            </div>

            <div className={`${searchOpen && "hidden sm:block"}`}>
                <div className={`flex items-center space-x-4`}>
                    <Link href='/watchlist' passHref>
                        <a className="relative group flex gap-1 px-3 py-1 my-1 text-gray-200 font-semibold text-sm cursor-pointer hover:text-red-600 transition duration-300 ease-out">
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="relative h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                </svg>
                                <span className='hidden font-semibold text-xs  absolute -left-1/4 top-8 group-hover:block group-hover:text-gray-200'>
                                    <h1 className=' bg-black px-2 py-1 rounded-md'>Watchlist</h1>
                                </span>
                            </>
                        </a>
                    </Link>
                    <a className="px-3 py-1 border-2 border-solid border-red-700 text-red-700 rounded-md font-semibold text-sm cursor-pointer hover:border-red-600 hover:text-red-600 transition duration-300 ease-out">Log in</a>
                </div>
            </div>
        </div>
    )
}

