'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiMail, FiLinkedin, FiGithub, FiGlobe } from 'react-icons/fi'

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.15
            }
        }
    }

    const itemVariants = {
        hidden: { y: 50, opacity: 0, scale: 0.9 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1
        }
    }

    const infoVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1
        }
    }

    const contactInfo = [
        {
            icon: FiMail,
            label: 'Email',
            value: 'rasanjani9jayasingha@gmail.com',
            href: 'mailto:rasanjani9jayasingha@gmail.com'
        },
        {
            icon: FiLinkedin,
            label: 'LinkedIn',
            value: 'linkedin.com/in/wameesha-jayasingha',
            href: 'https://linkedin.com/in/wameesha-jayasingha'
        },
        {
            icon: FiGithub,
            label: 'GitHub',
            value: 'github.com/Wameesha',
            href: 'https://github.com/Wameesha'
        }
    ]

    return (
        <motion.section
            ref={ref}
            id="contact"
            className="py-20 bg-gray-900"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className="max-w-4xl mx-auto px-4 sm:px-8 lg:px-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="text-center mb-14"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight"
                    >
                        Get In Touch
                    </motion.h2>
                    <motion.div
                        variants={itemVariants}
                        className="w-16 h-1 bg-purple-500 mx-auto mb-6 rounded-full"
                    />
                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        Ready to discuss data engineering opportunities?
                        <br />
                        Let&apos;s connect.
                    </motion.p>
                </motion.div>

                <div className="flex justify-center">
                    <motion.div
                        variants={infoVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full max-w-2xl space-y-8"
                    >
                        <motion.div variants={itemVariants}>
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Let&apos;s Start a Conversation
                            </h3>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                I am actively seeking data engineering internships and graduate roles.
                                Whether you have a pipeline challenge to solve, a team to join, or just
                                want to talk about the modern data stack - I would love to hear from you.
                            </p>
                        </motion.div>

                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={index}
                                    variants={itemVariants}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? '_blank' : undefined}
                                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    whileHover={{ scale: 1.03, x: 8 }}
                                    className="flex items-center p-5 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 group shadow-sm"
                                >
                                    <div className="p-2 bg-purple-900/30 rounded-lg group-hover:bg-purple-900/50 transition-colors duration-200">
                                        <item.icon className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-semibold text-white text-base">
                                            {item.label}
                                        </h4>
                                        <p className="text-gray-300 text-sm">
                                            {item.value}
                                        </p>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
}
