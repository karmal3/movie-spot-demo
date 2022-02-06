import Image from 'next/image'
import Link from 'next/link'

export default function Card({ data, w, h }) {
    return (
        <>
            <a href={`/movie/${data.id}`}>

                {/* <div style={{ height: `100%`, width: "100%", minWidth: `${w}px`}} className={`relative cursor-pointer transition duration-300 ease-out hover:scale-105 hover:z-10 py-3`}>
                    <Image className='rounded-md '
                        src={`https://image.tmdb.org/t/p/original/${data.poster_path === null ? data.backdrop_path : data.poster_path}`}
                        width={w}
                        height={h}
                        alt={data.original_title}
                        layout="responsive"
                        objectFit="cover"
                        placeholder="blur"
                        loading="eager"
                        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII='
                        priority

                    />
                </div> */}
                 <div className={`relative cursor-pointer transition duration-300 ease-out hover:scale-105 hover:z-10 py-3`}>
                    <img style={{ height: `${h}px`, width: `${w}px`, maxWidth: `${w}px`}} className='rounded-md object-cover'
                        src={`https://image.tmdb.org/t/p/original/${data.poster_path === null ? data.backdrop_path : data.poster_path}`}
                        width={w}
                        height={h}
                        alt={data.original_title}
                    />
                </div>

            </a>



        </>
    );
}
