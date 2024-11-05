"use client";

import { useEffect, useState } from "react";
import TextTransition, { presets } from "./TextTransition";


export default function ChangingText({
    options,
    className
}: {
    options: string[];
    className?: string;
}) {
    const [currentOptionIndex, setCurrentOptionIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentOptionIndex((currentCityIndex) => {
                return (currentCityIndex + 1) % options.length;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [setCurrentOptionIndex, options]);

    return (
            <TextTransition
                springConfig={presets.slow}
                inline={true}
                direction="down"
                translateValue="50%"
            >
                <span className={className}>{options[currentOptionIndex]}</span>
            </TextTransition>
    );
};