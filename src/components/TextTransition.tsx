"use client";


import React, { useRef, useEffect } from 'react';
import type { CSSProperties, PropsWithChildren } from 'react';

import { useTransition, animated, config, type SpringConfig } from '@react-spring/web';

export interface TextTransitionProps {
    className?: string;
    delay?: number;
    direction?: 'up' | 'down';
    inline?: boolean;
    springConfig?: SpringConfig;
    style?: CSSProperties;
    translateValue?: string;
}

function TextTransition(props: PropsWithChildren<TextTransitionProps>) {
    const {
        direction = 'up',
        inline = false,
        springConfig = config.default,
        delay = 0,
        className,
        style,
        translateValue: tv = '100%',
        children,
    } = props;

    const initialRun = useRef(true);
    const fromTransform = direction === 'down' ? `-${tv}` : tv;
    const leaveTransform = direction === 'down' ? tv : `-${tv}`;

    const transitions = useTransition([children], {
        enter: { opacity: 1, transform: 'translateY(0%)' },
        from: { opacity: 0, transform: `translateY(${fromTransform})` },
        leave: {
            opacity: 0,
            transform: `translateY(${leaveTransform})`,
            position: 'absolute',
        },
        config: springConfig,
        delay: !initialRun.current ? delay : undefined,
    });

    const currentRef = useRef<HTMLDivElement>(null);
    const heightRef = useRef<number | string>('auto');

    useEffect(() => {
        initialRun.current = false;
        const element = currentRef.current;

        // If element doesn't exist, then do nothing
        if (!element) return;

        const { height } = element.getBoundingClientRect();

        heightRef.current = height;
    }, [children, currentRef]);

    return (
        <animated.span
            className={`text-transition ${className} overflow-visible`}
            style={{
                ...style,
                whiteSpace: inline ? 'nowrap' : 'normal',
                display: inline ? 'inline-flex' : 'flex',
                height: heightRef.current,
            }}
        >
            {transitions((styles, item) => (
                <animated.span
                    style={{ ...styles }}
                >{item}</animated.span>
            ))}
        </animated.span>
    );
}

export default TextTransition;
export { config as presets };