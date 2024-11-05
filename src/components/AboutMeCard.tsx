import { motion } from "framer-motion";
import Image from "next/image";
import useIsMobile from "~/hooks/useIsMobile";


export default function AboutMeCard({
    title,
    imagePath,
    content,
    url,
    appearAfterSeconds
}: {
    title: string,
    imagePath: string,
    content: string,
    url: string,
    appearAfterSeconds: number
}) {
    const isMobile = useIsMobile();

    return (
        <motion.div
            key={isMobile.toString()}
            className="rounded-2xl w-64 md:w-44 md:h-48 flex items-center border-2 border-darkGray flex-col justify-start gap-y-2 p-4"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.5,
                delay: isMobile ? 0 : appearAfterSeconds,
            }}
            viewport={{ once: true, amount: 0.5 }}
        >
            <a className="flex flex-col items-center gap-y-2 group" href={url} target="_blank">
                <div className="h-[26px] flex items-center">
                    <Image src={imagePath} alt={title} width={80} height={80} draggable={false}  className="hover:scale-125 transition-transform duration-200" />
                </div>
                <span className="text-fontGray text-md font-bold text-center transition-colors duration-300 hover:text-white">{title}</span>
            </a>
            <span className="text-fontGray text-sm md:text-xs">{content}</span>
        </motion.div>
    )
}