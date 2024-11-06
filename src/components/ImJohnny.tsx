import { motion } from "framer-motion";
import Image from "next/image";

export default function ImJohnny({
    fadeInAfterSeconds
}: {
    fadeInAfterSeconds: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={
                "border-4 border-primary/20 select-none "
                + "rounded-3xl px-2 py-1 flex justify-between items-center gap-x-4 shadow-glow"
            }
            transition={{ duration: 0.5, delay: fadeInAfterSeconds }}
        >
            <Image
                src="/images/avatar.jpg"
                alt="Johnny Kessler Avatar"
                width={25}
                height={25}
                className="rounded-full"
            />
            <span className="text-white text-xl ">
                Hi, Im Johnny Kessler 👋
            </span>
        </motion.div>
    )
}