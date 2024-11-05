import { motion } from "framer-motion";
import useIsMobile from "~/hooks/useIsMobile";


export default function ProjectShowcaseRow({
    title,
    subtitle,
    icon,
    content1,
    content2,
}: {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    content1?: string | React.ReactNode;
    content2?: string | React.ReactNode;
}) {
    const isMobile = useIsMobile();

    return (
        <div className="flex flex-row gap-x-6 w-full overflow-clip md:overflow-visible">
            {/* Icon and vertical line for mobile */}
            <div className="flex md:hidden flex-col items-center gap-y-6">
                {icon}
                <div className="border-r border-fontGray h-full" />
            </div>

            {/* Content when on the left side */}
            {content1 ? (
                <motion.div
                    key={isMobile.toString()}
                    className="flex flex-col border border-darkGray rounded-xl p-6 flex-1 "
                    initial={{ x: isMobile ? 100 : -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        bounce: 0.05,
                        duration: 0.3
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <h3 className="text-xl md:text-2xl font-bold text-fontGray">{title}</h3>
                    <h4 className="text-xs text-fontGray">{subtitle}</h4>
                    {content1}
                </motion.div>
            ) : (
                <div className="hidden md:block border-1 border-black p-6 flex-1" />
            )}

            {/* Icon and vertical line for desktop */}
            <div className="hidden md:flex flex-col items-center gap-y-6">
                {icon}
                <div className="border-r border-fontGray h-full" />
            </div>

            {/* Content when on the right side */}
            {content2 ? (
                <motion.div
                    className="flex flex-col border border-darkGray rounded-xl p-6 flex-1"
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        bounce: 0.05,
                        duration: 0.3
                    }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <h3 className="text-xl md:text-2xl font-bold text-fontGray">{title}</h3>
                    <h4 className="text-xs text-fontGray">{subtitle}</h4>
                    {content2}
                </motion.div>
            ) : (
                <div className="hidden md:block border-1 border-black p-6 flex-1" />
            )}
        </div>
    );
}
