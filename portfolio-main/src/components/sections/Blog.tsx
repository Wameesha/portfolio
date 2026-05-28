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
    description: string
    link: string
    thumbnail: string
    categories: string[]
}

function stripHtml(html: string) {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
}

function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    })
}

function getExcerpt(description: string, maxLength = 120) {
    const text = stripHtml(description)
    return text.length > maxLength
        ? `${text.substring(0, maxLength).trim()}...`
        : text
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
    const cardImageRefs = useRef<Record<string, HTMLDivElement | null>>({})

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

    useEffect(() => {
        if (isLoading || hasError || posts.length === 0) return

        posts.slice(0, 6).forEach((item) => {
            const cardElement = cardImageRefs.current[item.link]
            if (!cardElement) return
            getCardImage(item, cardElement)
        })
    }, [posts, isLoading, hasError])

    function getCardImage(item: BlogItem, cardElement: HTMLDivElement) {
        if (item.thumbnail && item.thumbnail.trim() !== '') {
            const testImg = new Image()

            testImg.onload = () => {
                cardElement.style.backgroundImage = `url(${item.thumbnail})`
                cardElement.style.backgroundSize = 'cover'
                cardElement.style.backgroundPosition = 'center'
                cardElement.innerHTML = ''
            }

            testImg.onerror = () => {
                showGradientFallback(cardElement, item)
            }

            testImg.src = item.thumbnail
        } else {
            showGradientFallback(cardElement, item)
        }
    }

    function showGradientFallback(cardElement: HTMLDivElement, item: BlogItem) {
        const gradients = [
            'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
            'linear-gradient(135deg, #0d0d1a 0%, #1a0a2e 50%, #2d1b69 100%)',
            'linear-gradient(135deg, #0a0a1a 0%, #0d1b2e 50%, #1a3a5c 100%)',
            'linear-gradient(135deg, #1a0d2e 0%, #2d1654 50%, #6b21a8 100%)',
            'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
            'linear-gradient(135deg, #0c0a1e 0%, #1e0a3c 50%, #4c1d95 100%)'
        ]

        const index = (item.title?.length || 0) % gradients.length
        cardElement.style.background = gradients[index]

        const tag = getTag(item.categories)
        cardElement.innerHTML = `
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; gap:12px;">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.5">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
      <span style="color:#a855f7; font-size:12px; font-weight:500; letter-spacing:0.05em; text-transform:uppercase;">
        ${tag}
      </span>
    </div>
  `
    }

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={`skeleton-${index}`}
                                className="bg-gray-900 rounded-2xl border border-gray-800/60 overflow-hidden animate-pulse"
                            >
                                <div className="h-44 bg-gray-800" />
                                <div className="p-6 space-y-4">
                                    <div className="h-5 w-24 bg-gray-800 rounded-full" />
                                    <div className="h-5 w-4/5 bg-gray-800 rounded" />
                                    <div className="h-4 w-full bg-gray-800 rounded" />
                                    <div className="h-4 w-3/5 bg-gray-800 rounded" />
                                    <div className="h-9 w-full bg-gray-800 rounded-lg" />
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.slice(0, 6).map((item) => (
                                <motion.article
                                    key={item.link}
                                    variants={itemVariants}
                                    className="group bg-gray-900 rounded-2xl border border-gray-800/60 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(168,85,247,0.25)]"
                                >
                                    <div
                                        ref={(element) => {
                                            cardImageRefs.current[item.link] = element
                                        }}
                                        className="card-image w-full h-44 bg-gray-800 flex items-center justify-center"
                                    >
                                        <FiEdit3 className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <div className="p-6 space-y-3">
                                        <span className="inline-flex px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-xs font-medium">
                                            {getTag(item.categories)}
                                        </span>
                                        <h3 className="text-lg font-semibold text-white line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-300 leading-relaxed">
                                            {getExcerpt(item.description)}
                                        </p>
                                        <div className="text-xs text-gray-400">
                                            {formatDate(item.pubDate)}
                                        </div>
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-4 inline-flex w-full items-center justify-center gap-2 px-4 py-2 border-2 border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white rounded-lg font-medium transition-colors duration-200"
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
