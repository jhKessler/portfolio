"use client";

import React from "react";
import AnimateInAfter from "~/components/animations/AnimateInAfter";
import { motion } from "framer-motion";
import GithubIcon from "../icons/Github";
import LinkedInIcon from "../icons/LinkedIn";
import ChangingText from "../ChangingText";
import ImJohnny from "../ImJohnny";

const TECHSTACK = [
  "Code",
  "NextJS",
  "Python",
  "Docker",
  "Tailwind",
  "Pandas",
  "SQL",
  "Pyspark",
  "React",
  "Airflow",
  "AWS",
  "PyTorch",
  "Postgres",
  "Cloudflare",
  "FastAPI",
  "TypeScript",
  "Kubernetes",
  "Clickhouse"
];



export default function HeroSection({
  words,
  perElementDelay,
  animationDoneAfterSeconds
}: {
  words: string[]
  perElementDelay: number
  animationDoneAfterSeconds: number
}) {
  return (
    <div className="flex flex-col items-center max-w-full gap-y-6">
      <ImJohnny fadeInAfterSeconds={(words.length + 2) * perElementDelay + 0.5} />
      <h1 className="text-white text-4xl lg:text-7xl select-none">
        <div>
          {words.map((word, index) => (
            <AnimateInAfter
              key={index}
              delay={index * perElementDelay}
              index={index}
              text={word}
              addWhiteSpace={index !== words.length - 1}
              duration={0.5}
            />
          ))}
        </div>
        <div className="pl-10 md:pl-11 lg:pl-20">
          <AnimateInAfter
            delay={words.length * perElementDelay}
            index={words.length}
            text="with"
            addWhiteSpace={true}
          />
          <span className="inline-block w-0 overflow-visible align-top whitespace-nowrap">
            <AnimateInAfter
              delay={(words.length + 1) * perElementDelay}
              index={words.length + 1}
              text={<ChangingText className="bg-gradient-to-r from-[#3A1D90] via-[#5832C9] to-[#3406a9] text-transparent bg-clip-text" options={TECHSTACK} />}
              addWhiteSpace={false}
            />
          </span>
        </div>
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-row gap-x-6 justify-center w-full"
        transition={{ duration: 0.5, delay: animationDoneAfterSeconds+0.5 }}>
        <GithubIcon />
        <LinkedInIcon />
      </motion.div>
    </div>
  );
}