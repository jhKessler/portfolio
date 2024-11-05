"use client";

import { Element } from 'react-scroll';
import Footer from "~/components/layout/Footer";
import StickyNavbar from "~/components/layout/Navbar";
import { Section } from '~/enums/Section';
import AboutSection from "../components/sections/AboutSection";
import ContactSection from "../components/sections/ContactSection";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";

const WORDS = ["I", "build", "cool", "stuff"];
const PER_ELEMENT_DELAY = 0.2;
// + 2 for "with" and the techstack animation, + 1 for the delay before everything else after the headline animation
const INTRO_ANIMATION_DONE_AFTER = (WORDS.length + 2) * PER_ELEMENT_DELAY + 1;

export default function HomePage() {

  return (
    <main className="flex flex-col items-center min-h-dvh pt-48 gap-y-12 max-w-6xl w-screen">
      <HeroSection perElementDelay={PER_ELEMENT_DELAY} words={WORDS} animationDoneAfterSeconds={INTRO_ANIMATION_DONE_AFTER} />
      <StickyNavbar
        appearAfterSeconds={INTRO_ANIMATION_DONE_AFTER}
      />
      <Element name={Section.ABOUT}>
        <AboutSection appearAfterSeconds={INTRO_ANIMATION_DONE_AFTER} />
      </Element>
      <Element name={Section.PROJECTS}>
        <ProjectsSection appearAfterSeconds={INTRO_ANIMATION_DONE_AFTER} />
      </Element>
      <Element name={Section.CONTACT}>
        <ContactSection appearAfterSeconds={INTRO_ANIMATION_DONE_AFTER} />
      </Element>
      <Footer />
    </main>
  );
}
