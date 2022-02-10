import { useEffect, useState } from 'react';

export default function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    const [isMobile, setIsMobile] = useState(false);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            if (window.innerWidth < 640) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return { isMobile, windowSize };
}
