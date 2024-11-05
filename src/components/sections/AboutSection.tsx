"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import AboutMeCard from "../AboutMeCard";
import SectionTitle from "../SectionTitle";


export default function AboutSection({
    appearAfterSeconds
}: {
    appearAfterSeconds: number;
}) {
    return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: appearAfterSeconds }}
                className="flex flex-col items-center gap-y-6"
            >
                <div className="flex flex-col items-center gap-y-6">
                    <SectionTitle
                        sectionNumber={1}
                        sectionTitle="About Me"
                    />
                    <span className="text-fontGray text-center text-lg max-w-2xl">
                        I&apos;m a software engineer from Hamburg with 5 years of
                        experience in coding and building cool stuff.
                        I love working across various fields, whether it&apos;s data science,
                        frontend, backend, or DevOps.
                    </span>
                    <Image
                        src="/portrait.jpg"
                        alt="Johnny Kessler at the Solutions Conference"
                        width={200}
                        height={200}
                        className="rounded-2xl"
                        draggable={false}
                    />
                </div>

                <div className="flex flex-col w-full items-center gap-y-6">
                    <div className="flex flex-col md:flex-row w-full justify-center items-center gap-x-6 gap-y-6">
                        <AboutMeCard
                            title="TechLabs Hamburg Mentor"
                            imagePath="/techlabs.png"
                            content="Mentoring students in programming and data science at TechLabs Hamburg as a volunteer."
                            url="https://www.techlabs.org/location/hamburg"
                            appearAfterSeconds={0}
                        />
                        <AboutMeCard
                            title="ARIC Brown Bag Award Winner"
                            imagePath="/aric.png"
                            content="Youngest recipient of the ARIC Brown Bag Award."
                            url="https://www.linkedin.com/posts/johnny-kessler_artificialintelligence-inecht-ai-activity-6983321886587768832-JyHg"
                            appearAfterSeconds={0.35}
                        />
                        <AboutMeCard
                            title="Published Co-Author"
                            imagePath="/haufe.png"
                            content="Co-author of industry book about AI and its impact on our lives."
                            url="https://www.amazon.de/K%C3%BCnstliche-Intelligenz-unser-Leben-pr%C3%A4gt/dp/3648162047"
                            appearAfterSeconds={0.7}
                        />
                    </div>
                </div>
            </motion.div>
    );
}
