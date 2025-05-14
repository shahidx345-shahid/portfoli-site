"use client"

import { motion } from "framer-motion"

interface Skill {
  name: string
  level: number // 1-10
  category: "frontend" | "backend" | "design" | "tools"
}

const skills: Skill[] = [
  { name: "React", level: 9, category: "frontend" },
  { name: "Next.js", level: 9, category: "frontend" },
  { name: "bootstrap", level: 8, category: "frontend" },
  { name: "JavaScript", level: 9, category: "frontend" },
  { name: "HTML/CSS", level: 9, category: "frontend" },
  { name: "Tailwind", level: 8, category: "frontend" },
  { name: "Node.js", level: 8, category: "backend" },
  { name: "Express.js", level: 7, category: "backend" },
  { name: "Sqlite 3", level: 7, category: "backend" },
  { name: "Mysql", level: 7, category: "backend" },
  { name: "Django", level: 7, category: "backend" },
  { name: "Python", level: 7, category: "backend" },
  
  { name: "Git", level: 8, category: "tools" },
  { name: "Figma", level: 7, category: "design" },
  { name: "UI/UX", level: 7, category: "design" },
]

export default function SkillOrb() {
  const getCategoryColor = (category: Skill["category"]) => {
    switch (category) {
      case "frontend":
        return "bg-emerald-500"
      case "backend":
        return "bg-cyan-500"
      case "design":
        return "bg-purple-500"
      case "tools":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  const categories = {
    frontend: "Frontend Development",
    backend: "Backend Development",
    design: "Design",
    tools: "Tools & DevOps",
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {Object.entries(categories).map(([category, title], categoryIndex) => (
        <motion.div
          key={category}
          className="mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills
              .filter((skill) => skill.category === category)
              .map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + categoryIndex * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-sm">{skill.name}</h4>
                    <span className="text-xs text-gray-400">{skill.level}/10</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${getCategoryColor(skill.category)}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level * 10}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
