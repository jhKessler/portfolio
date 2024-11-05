"use client";

import { motion } from 'framer-motion';
import { Link as SectionLink } from 'react-scroll';
import { type Section } from '~/enums/Section';
import useIsMobile from '~/hooks/useIsMobile';


export default function NavbarLink({
    onClick,
    onSetActive,
    text,
    isSelected,
    to
}: {
    onClick: () => void,
    onSetActive: () => void,
    text: string,
    isSelected: boolean,
    to: Section,
}) {
    const isMobile = useIsMobile();

    return (
        <SectionLink
            key={isMobile.toString()}
            to={to}
            smooth={true}
            className='flex-1 basis-0 relative hover:text-white transition-colors duration-300 rounded-3xl px-8 py-2 cursor-pointer'
            onClick={onClick}
            offset={-75}
            spy={true}
            onSetActive={onSetActive}
            duration={isMobile ? 1500 : undefined} // Slow down the scroll on mobile
        >
            {isSelected && (
                <motion.div
                    layoutId="highlight"
                    className="absolute inset-0 bg-darkGray rounded-3xl"
                    style={{ zIndex: 1 }}
                />
            )}
            <span className='relative z-10'>{text}</span>
        </SectionLink>
    );
}