import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Events, scrollSpy } from "react-scroll";
import { Section } from "~/enums/Section";
import NavbarLink from "./NavbarLink";
import { Link as SectionLink } from 'react-scroll';

export default function StickyNavbar({
    appearAfterSeconds
  }: {
    appearAfterSeconds: number;
  }) {
    const [currentSelection, setCurrentSection] = useState<Section>(Section.HERO);
    const [isSticky, setIsSticky] = useState(false);
    const isCurrentlyScrolling = useRef(false);
    const navbarRef = useRef<HTMLDivElement>(null);
  
    const handleClickDecorator = (section: Section) => {
      return () => {
        isCurrentlyScrolling.current = true;
        setCurrentSection(section);
      }
    }
  
    const handleSetActiveDecorator = (section: Section) => {
      return () => {
        // Prevent setting the current selection by position while scrolling so the animation does not get interrupted
        if (!isCurrentlyScrolling.current) {
          setCurrentSection(section);
        }
      }
    }
  
    useEffect(() => {
      Events.scrollEvent.register('end', () => {
        // Reset the scrolling flag after the scroll event is done
        isCurrentlyScrolling.current = false;
      });
      scrollSpy.update();
      return () => {
        Events.scrollEvent.remove('end');
      };
    }, [])
  
    useEffect(() => {
      const handleScroll = () => {
        if (navbarRef.current) {
          const top = navbarRef.current.getBoundingClientRect().top;
          // Check if the navbar is at the top of the page, so we can color it differently
          setIsSticky(top <= 13);
        }
      };
      // Initial check in case the page is already scrolled
      handleScroll();
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <motion.div
        ref={navbarRef}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center sticky top-3 z-50"
        transition={{ duration: 0.5, delay: appearAfterSeconds }}>
        <nav
          className={`relative inline-flex items-center border text-fontGray rounded-3xl p-1 backdrop-blur-md backdrop-filter bg-black/50 ${isSticky? "border-primary" : "border-darkGray"}`}>
         <NavbarLink
            onClick={handleClickDecorator(Section.ABOUT)}
            onSetActive={handleSetActiveDecorator(Section.ABOUT)}
            to={Section.ABOUT}
            text='About'
            isSelected={currentSelection === Section.ABOUT}
          /> 
          <NavbarLink
            onClick={handleClickDecorator(Section.PROJECTS)}
            onSetActive={handleSetActiveDecorator(Section.PROJECTS)}
            to={Section.PROJECTS}
            text='Projects'
            isSelected={currentSelection === Section.PROJECTS}
          />
          <NavbarLink
            onClick={handleClickDecorator(Section.CONTACT)}
            onSetActive={handleSetActiveDecorator(Section.CONTACT)}
            to={Section.CONTACT}
            text='Contact'
            isSelected={currentSelection === Section.CONTACT}
          />
          <SectionLink
            to={Section.HERO}
            className='hidden'
            offset={-75}
            spy={true}
            onSetActive={handleSetActiveDecorator(Section.HERO)}
        />
        </nav>
      </motion.div>
    )
  }