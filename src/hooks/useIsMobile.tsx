import { useState, useEffect } from "react";

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial value

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return isMobile;
}