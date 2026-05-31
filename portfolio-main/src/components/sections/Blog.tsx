'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { FiEdit3 } from 'react-icons/fi'
import { SiMedium } from 'react-icons/si'

const MEDIUM_RSS_URL = 'https://medium.com/feed/@rasanjani9jayasingha'
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MEDIUM_RSS_URL)}&api_key=azyivra2d4grd7btmlxyhsrarwixymeu2lrbsvgt&count=6`

type BlogItem = {
    title: string
    pubDate: string
    link: string
    categories: string[]
}

function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    })
}

function getTag(categories: string[]) {
    if (!categories || categories.length === 0) return 'Data Engineering'
    return categories[0]
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function Blog() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: '-100px' })
    const [posts, setPosts] = useState<BlogItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    useEffect(() => {
        let isMounted = true

        const fetchPosts = async () => {
            try {
                const response = await fetch(API_URL)
                const data = await response.json()

                if (!isMounted) return

                if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
                    setPosts(data.items)
                    setHasError(false)
                } else {
                    setHasError(true)
                }
            } catch {
                if (!isMounted) return
                setHasError(true)
            } finally {
                if (!isMounted) return
                setIsLoading(false)
            }
        }

        fetchPosts()

        return () => {
            isMounted = false
        }
    }, [])


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    }

    return (
        <motion.section
            ref={ref}
            id="blog"
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
                    animate={isInView ? 'visible' : 'hidden'}
                    className="text-center mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                    >
                        Technical Writing
                    </motion.h2>
                    <motion.div
                        variants={itemVariants}
                        className="w-20 h-1 bg-purple-500 mx-auto mb-8"
                    />
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                    >
                        Sharing what I learn about data engineering, pipelines, and the modern data stack
                    </motion.p>
                </motion.div>

                {isLoading && (
                    <div className="flex flex-col gap-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="bg-gray-900 rounded-2xl border border-gray-800/60 px-6 py-5 animate-pulse"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 sm:flex-1">
                                        <div className="h-5 w-24 bg-gray-800 rounded-full" />
                                        <div className="h-5 w-4/5 bg-gray-800 rounded sm:w-72" />
                                        <div className="h-4 w-24 bg-gray-800 rounded" />
                                    </div>
                                    <div className="h-9 w-full bg-gray-800 rounded-lg sm:w-40" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && (hasError || posts.length === 0) && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-900/30 flex items-center justify-center">
                            <FiEdit3 className="w-7 h-7 text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Posts Loading...</h3>
                        <p className="text-gray-300 mb-6">
                            Check back soon or read directly on Medium
                        </p>
                        <a
                            href="https://medium.com/@rasanjani9jayasingha"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200"
                        >
                            Visit My Medium
                        </a>
                    </div>
                )}

                {!isLoading && !hasError && posts.length > 0 && (
                    <>
                        <div className="flex flex-col gap-4">
                            {posts.slice(0, 6).map((item) => (
                                <motion.article
                                    key={item.link}
                                    variants={itemVariants}
                                    className="group bg-gray-900 rounded-2xl border border-gray-800/60 px-6 py-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(168,85,247,0.25)]"
                                >
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 sm:flex-1">
                                            <span className="inline-flex px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-xs font-medium">
                                                {getTag(item.categories)}
                                            </span>
                                            <h3 className="text-lg font-semibold text-white sm:flex-1 line-clamp-2">
                                                {item.title}
                                            </h3>
                                            <div className="text-xs text-gray-400 whitespace-nowrap">
                                                {formatDate(item.pubDate)}
                                            </div>
                                        </div>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex w-full items-center justify-center gap-2 px-4 py-2 border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg font-medium transition-colors duration-200 sm:w-auto"
                                        >
                                            <SiMedium className="w-4 h-4" />
                                            Read on Medium
                                        </a>
                                    </div>
                                </motion.article>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <a
                                href="https://medium.com/@rasanjani9jayasingha"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200"
                            >
                                View All Posts on Medium →
                            </a>
                        </div>
                    </>
                )}
            </div>
        </motion.section>
    )
}
