import Image from 'next/image'

export default function CastCard({ data, w, h }) {
    return (
        <>
            {/* <a href={`/movie/${data.id}`}> */}

            {/* <div style={{ height: `100%`, width: "100%", minWidth: `${w}px` }} className={`relative cursor-pointer transition duration-300 ease-out hover:z-10 py-3`}>
                <Image className='rounded-md'
                    src={`https://image.tmdb.org/t/p/original/${data.profile_path}`}
                    width={w}
                    height={h}
                    alt={data.original_name}
                    layout="responsive"
                    objectFit="cover"
                    placeholder="blur"
                    loading="eager"
                    blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mMUrAcAAKcAkqLcIOsAAAAASUVORK5CYII='
                    priority
                />
                <div style={{ height: `${h}px` }} className={`text-gray-300 absolute bottom-0 mb-3 flex flex-col flex-wrap justify-end items-center text-center rounded-sm w-full bg-gradient-to-t from-[#111111] to-transparent`}>
                    <h1 className='text-sm font-extralight p-1 '>{data.original_name}</h1>
                    <h1 className='text-sm font-thin p-1 '>Character {data.character}</h1>

                </div>

            </div> */}
            <div className={`relative cursor-pointer transition duration-300 ease-out hover:z-10 py-3`}>
                <img style={{ height: `${h}px`, width: `${w}px`, maxWidth: `${w}px`}} className='rounded-md object-cover'
                    src={`https://image.tmdb.org/t/p/original/${data.profile_path}`}
                    width={w}
                    height={h}
                    alt={data.original_name}
                 
               
                />
                <div style={{ height: `${h}px` }} className={`text-gray-300 absolute bottom-0 mb-3 flex flex-col flex-wrap justify-end items-center text-center rounded-sm w-full bg-gradient-to-t from-[#111111] to-transparent`}>
                    <h1 className='text-sm font-extralight p-1 '>{data.original_name}</h1>
                    <h1 className='text-sm font-thin p-1 '>Character {data.character}</h1>

                </div>

            </div>

            {/* </a> */}
        </>
    );
}
