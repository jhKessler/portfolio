import { motion } from "framer-motion";
import React from "react";

const AnimateInAfter = ({
    delay,
    index,
    text,
    addWhiteSpace,
    duration = 0.2
}: {
    delay: number,
    index: number,
    text: React.ReactNode,
    addWhiteSpace: boolean,
    duration?: number
}) => {
    return (
        <React.Fragment key={index}>
            <motion.span
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration, delay }}
            >
                {text}
            </motion.span>
            {addWhiteSpace && <span>{" "}</span>}
        </React.Fragment>
    )
}

export default AnimateInAfter;