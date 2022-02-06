import { useEffect, useState } from 'react';

export default function useWindowMobile() {


    // Initialize state with undefined width/height so server and client renders match
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 500) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return isMobile;

}
