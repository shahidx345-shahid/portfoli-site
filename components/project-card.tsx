"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Card3D from "@/components/animations/3d-card"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  image: string
  demoUrl?: string
}

export default function ProjectCard({ title, description, tags, image, demoUrl }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card3D className="h-full">
      <motion.div
        className="group bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 h-full"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={image || "/placeholder.svg?height=400&width=600"}
              alt={title}
              className="w-full h-full object-cover"
              width={600}
              height={400}
              loading="lazy"
            />
          </motion.div>
        </div>

        <div className="p-6 flex flex-col h-full">
          <div className="flex-grow">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300 mb-4 line-clamp-3">{description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <motion.span
                key={index}
                className="px-2 py-0.5 text-xs rounded-md bg-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {tag}
              </motion.span>
            ))}
            </div>
          </div>

          <div className="mt-auto pt-4">
            <motion.a
              href={demoUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md ${demoUrl ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-700 text-gray-400 cursor-not-allowed'} transition-colors`}
              whileHover={demoUrl ? { scale: 1.05, x: 5 } : {}}
              whileTap={demoUrl ? { scale: 0.95 } : {}}
              transition={{ duration: 0.2 }}
              onClick={(e) => !demoUrl && e.preventDefault()}
            >
              {demoUrl ? 'View Project' : 'Coming Soon'} <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </Card3D>
  )
}
