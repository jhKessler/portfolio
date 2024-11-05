import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";


export default function LinkedInIcon({
    appearAfterSeconds,
}: {
    appearAfterSeconds?: number;
}) {

    return (
        <motion.a
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
                duration: 0.3,
                delay: appearAfterSeconds,
            }}
            viewport={{ once: true, amount: 0.5 }}
            className="bg-darkGray p-3 rounded-xl"
            href="https://www.linkedin.com/in/johnny-kessler"
            target="_blank"
        >
            <FaLinkedin
                color="white"
                size={32}
                className="transform transition-transform duration-200 hover:scale-125"
            />
        </motion.a>
    )
}