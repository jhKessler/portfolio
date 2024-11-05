"use client";

import { motion } from "framer-motion";
import GithubIcon from "../../components/icons/Github";
import LinkedInIcon from "../../components/icons/LinkedIn";
import SectionTitle from "../SectionTitle";

export default function ContactSection({
    appearAfterSeconds
}: {
    appearAfterSeconds: number;
}) {
    return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-y-6"
                // only delay 1 because the div is only mounted after the intro animation is done
                transition={{ duration: 0.5, delay: appearAfterSeconds }}>
                <SectionTitle sectionNumber={3} sectionTitle="Contact me" />
                <span className="text-fontGray text-center text-lg max-w-2xl">
                    Thanks for visiting my personal website! Wanna reach out to me? Here are some ways to do so.
                </span>
                <div className="flex flex-row gap-x-6">
                    <GithubIcon appearAfterSeconds={0.3} />
                    <LinkedInIcon appearAfterSeconds={0.6} />
                </div>
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.3,
                        delay: 1,
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                    className="text-fontGray text-center text-lg max-w-2xl"
                >
                    Not what you&apos;re looking for? <br /> Shoot me a message at <a
                        href="mailto:contact@johnny-kessler.dev"
                        className="underline font-bold hover:text-white transition-colors duration-300 text-nowrap"
                    >contact@johnny-kessler.dev
                    </a>
                </motion.span>
            </motion.div>
    )
}