"use client";

import { motion } from "framer-motion";
import { CiTrophy } from "react-icons/ci";
import { GrGraphQl } from "react-icons/gr";
import { PiCodeThin, PiFireExtinguisherThin } from "react-icons/pi";
import COLORS from "~/colors";
import ProjectShowcaseRow from "../ProjectShowcaseRow";
import SectionTitle from "../SectionTitle";


export default function ProjectsSection({
    appearAfterSeconds
}: {
    appearAfterSeconds: number
}) {
    return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-y-6"
                transition={{ duration: 0.5, delay: appearAfterSeconds }}>
                <SectionTitle sectionNumber={2} sectionTitle="My Projects" />
                <span className="text-fontGray text-center text-lg max-w-2xl">
                    In my time as a developer, I have worked on a variety of projects. Here are some of my favorites!
                </span>
                <div className="flex flex-col gap-y-6">
                    <ProjectShowcaseRow
                        title="Wildfire prediction"
                        subtitle="Predicting wildfire outbreaks in South Africa"
                        icon={<PiFireExtinguisherThin color={COLORS.fontGray} size={50} />}
                        content1={<p className="text-fontGray mt-2 text-sm">
                            Wildfires are a huge problem in South Africa.
                            At Deloitte I had the opportunity to work on the  {" "}
                            <a
                                href="https://www.weforum.org/publications/the-next-frontier-in-fighting-wildfires-fireaid-pilot-and-scaling/"
                                target="_blank"
                                className="underline font-bold">
                                FireAId
                            </a>
                            {" "} Project of the World Economic Forum and help the fight against wildfires with AI.
                            I was responsible for most of the data engineering work and, among other things, utilized Python and AWS Lambda to create a realtime pipeline that combines geospatial data from various sources.
                        </p>}
                    />
                    <ProjectShowcaseRow
                        title="Arbitrage on the Ethereum blockchain"
                        subtitle="Automatically trading cryptocurrencies for a profit"
                        icon={<GrGraphQl color={COLORS.fontGray} size={50} />}
                        content2={<p className="text-fontGray mt-2 text-sm">
                            During 2022, <a
                                className="font-bold underline"
                                href="https://github.com/lennybakkalian"
                                target="_blank">
                                @lennybakkalian
                            </a> {" "} and me
                            created a program that automatically trades arbitrage in cryptocurrencies on the Ethereum blockchain for a profit.
                            I was especially working on finding arbitrage opportunities using PySpark and graph theory.
                        </p>}
                    />
                    <ProjectShowcaseRow
                        title="Euro 2024 prediction"
                        subtitle="Predicting betting odds for the Euro 2024 in Germany"
                        icon={<CiTrophy color={COLORS.fontGray} size={50} />}
                        content1={<p className="text-fontGray mt-2 text-sm">
                            In my free time I like to work on projects that interest me. One of those projects was predicting the betting odds for the Euro 2024 in Germany.
                            I used Python, statistical models and a simple machine learning model to predict odds for each team.
                            The model was able to give me a good idea of which bets on betting sites were over or underpriced.
                        </p>}
                    />
                    <ProjectShowcaseRow
                        title="My Portfolio"
                        subtitle="Making a personal website that is way over the top"
                        icon={<PiCodeThin color={COLORS.fontGray} size={50} />}
                        content2={<p className="text-fontGray mt-2 text-sm">
                            This website. That&apos;s right, the website you are currently on! I built it in a weekend to flex on my friends.
                            The mission? Go totally overboard with everything. Did I pull it off?
                        </p>}
                    />
                </div>
            </motion.div>
    )
}