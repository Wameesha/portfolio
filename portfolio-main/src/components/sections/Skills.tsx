'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { FiActivity, FiCheckSquare, FiCpu, FiDatabase, FiEye, FiGitBranch, FiGrid, FiLink, FiZap } from 'react-icons/fi'
import {
    SiApacheairflow, SiApachekafka, SiDbt, SiSnowflake, SiSupabase, SiLooker, SiPandas,
    SiMysql, SiMongodb, SiPython, SiScala, SiOpenjdk, SiGit, SiGithub, SiLinux, SiFigma,
    SiPostman, SiReact, SiSpringboot
} from 'react-icons/si'


// Main technologies to display with centered cloud positioning
const mainTechnologies = [
    { icon: SiGit, color: '#F05032', position: { top: '10%', left: '12%' } },
    { icon: SiGithub, color: '#FFFFFF', position: { top: '12%', left: '35%' } },
    { icon: SiLinux, color: '#FCC624', position: { top: '10%', left: '60%' } },
    { icon: SiPostman, color: '#FF6C37', position: { top: '12%', left: '82%' } },
    { icon: SiFigma, color: '#F24E1E', position: { top: '22%', left: '15%' } },
    { icon: SiReact, color: '#61DAFB', position: { top: '22%', left: '38%' } },
    { icon: SiSpringboot, color: '#6DB33F', position: { top: '22%', left: '62%' } },
    { icon: SiLooker, color: '#4285F4', position: { top: '22%', left: '85%' } },
    { icon: FiEye, color: '#9CA3AF', position: { top: '34%', left: '12%' } },
    { icon: SiPython, color: '#3776AB', position: { top: '34%', left: '35%' } },
    { icon: FiDatabase, color: '#9CA3AF', position: { top: '34%', left: '58%' } },
    { icon: SiOpenjdk, color: '#007396', position: { top: '34%', left: '80%' } },
    { icon: SiScala, color: '#DC322F', position: { top: '46%', left: '12%' } },
    { icon: SiApacheairflow, color: '#017CEE', position: { top: '46%', left: '35%' } },
    { icon: SiPandas, color: '#150458', position: { top: '46%', left: '58%' } },
    { icon: FiLink, color: '#9CA3AF', position: { top: '46%', left: '80%' } },
    { icon: FiActivity, color: '#9CA3AF', position: { top: '58%', left: '12%' } },
    { icon: SiSnowflake, color: '#29B5E8', position: { top: '58%', left: '35%' } },
    { icon: SiDbt, color: '#FF694B', position: { top: '58%', left: '58%' } },
    { icon: SiSupabase, color: '#3ECF8E', position: { top: '58%', left: '80%' } },
    { icon: SiMysql, color: '#4479A1', position: { top: '70%', left: '12%' } },
    { icon: SiMongodb, color: '#47A248', position: { top: '70%', left: '35%' } },
    { icon: SiApachekafka, color: '#231F20', position: { top: '70%', left: '58%' } },
    { icon: FiZap, color: '#FBBF24', position: { top: '70%', left: '80%' } },
    { icon: FiGitBranch, color: '#9CA3AF', position: { top: '82%', left: '12%' } },
    { icon: FiCheckSquare, color: '#9CA3AF', position: { top: '82%', left: '35%' } },
    { icon: FiGrid, color: '#9CA3AF', position: { top: '82%', left: '58%' } },
    { icon: FiCpu, color: '#9CA3AF', position: { top: '82%', left: '80%' } }
]

export default function Skills() {
    // Typing animation for 'Always Learning & Evolving' section
    const learningText = "Always Learning & Evolving\nAs a Data Engineering specialist, I stay current with the modern data stack - from event streaming and CDC patterns to cloud-native warehousing and declarative transformations. Every project I build adds a new tool to this growing stack.";
    const [typed, setTyped] = useState("");
    const [typingIndex, setTypingIndex] = useState(0);
    useEffect(() => {
        if (typingIndex < learningText.length) {
            const timeout = setTimeout(() => {
                setTyped(typed + learningText[typingIndex]);
                setTypingIndex(typingIndex + 1);
            }, 15); // Faster typing speed
            return () => clearTimeout(timeout);
        }
    }, [typed, typingIndex, learningText]);
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    }

    const iconVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.8,
                type: "spring" as const,
                stiffness: 100
            }
        }
    }

    return (
        <motion.section
            ref={ref}
            id="skills"
            className="py-20 bg-gray-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Skills &
                        </motion.span>
                        {" "}
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-purple-400"
                        >
                            Technologies
                        </motion.span>
                    </motion.h2>
                    <motion.div
                        variants={itemVariants}
                        className="w-20 h-1 bg-purple-400 mx-auto mb-8 rounded-full"
                        whileHover={{ width: 100 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                    >
                        Technologies I work with to build modern, scalable data systems
                    </motion.p>
                </motion.div>

                {/* Floating Cloud Tech Icons */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 py-8 mx-auto max-w-5xl"
                >
                    {mainTechnologies.map((tech, index) => {
                        const IconComponent = tech.icon || FiDatabase;
                        return (
                            <motion.div
                                key={index}
                                variants={iconVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.2,
                                    zIndex: 10,
                                    transition: { duration: 0.2 }
                                }}
                                className="flex flex-col items-center justify-center cursor-pointer group"
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -12, 0, 12, 0],
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.3
                                    }}
                                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gray-800/80 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700/50 hover:border-purple-400/50 group-hover:bg-gray-700/90"
                                >
                                    <IconComponent
                                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 transition-all duration-300 group-hover:scale-110"
                                        style={{ color: tech.color }}
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Additional Info */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="mt-20 text-center"
                >
                    <h3 className="text-2xl font-bold text-white mb-4">
                        {typed.split("\n")[0]}
                    </h3>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto whitespace-pre-line">
                        {typed.split("\n").slice(1).join("\n")}
                        <span className="animate-pulse">|</span>
                    </p>
                </motion.div>
            </div>
        </motion.section>
    )
}
