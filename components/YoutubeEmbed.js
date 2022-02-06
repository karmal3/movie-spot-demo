export default function YoutubeEmbed({ trailer }) {
    const temp = trailer.results;
    const officalTrailers = []
    const trailerName = ["Teaser", "Trailer"]
    let ytKey = null;
    
    trailer.results.map((video) => {
        trailerName.map((tn) => {
            if ((video.name).includes(tn)) {
                officalTrailers.push(video);
            }
        })
    })
    const unique = [...new Set(officalTrailers)]
    unique.length !== 0 ? ytKey = unique[Math.floor(Math.random() * unique.length)] :  ytKey = temp[Math.floor(Math.random() * temp.length)];
   

    if (!ytKey) return null
    return (
        <div >
            <iframe className="w-full h-full absolute rounded-md"
                src={`https://www.youtube.com/embed/${ytKey.key}?&autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube">
            </iframe>
        </div>
    )
}

