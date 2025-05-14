'use client';

import { Suspense } from 'react'
import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react"
import Image from "next/image"
import dynamic from 'next/dynamic';
import { ClientOnly } from '@/utils/noop';

// Dynamically import components that use browser APIs
const ProjectCard = dynamic(() => import("@/components/project-card"), { ssr: false });
const SkillOrb = dynamic(() => import("@/components/skill-orb"), { ssr: false });
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: true });
const TypedText = dynamic(() => import("@/components/typed-text"), { ssr: false });
const ScrollReveal = dynamic(() => import("@/components/animations/scroll-reveal"), { ssr: false });
const ParallaxSection = dynamic(() => import("@/components/animations/parallax-section"), { ssr: false });
const Magnetic = dynamic(() => import("@/components/animations/magnetic"), { ssr: false });
const Card3D = dynamic(() => import("@/components/animations/3d-card"), { ssr: false });
const LiquidButton = dynamic(() => import("@/components/animations/liquid-button"), { ssr: false });
const TextShimmer = dynamic(() => import("@/components/animations/text-shimmer"), { ssr: false });
const WaveDivider = dynamic(() => import("@/components/animations/wave-divider"), { ssr: false });
const ContactFormAlt = dynamic(() => import("@/components/contact-form-alt"), { ssr: false });
const ClientComponentsWrapper = dynamic(() => import("@/components/client-components-wrapper"), { ssr: false });

// Loading fallback
const LoadingFallback = () => <div className="w-full h-40 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-lg"></div>

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-black dark:via-gray-900 dark:to-black text-gray-900 dark:text-white overflow-hidden">
<ClientOnly>
        <ClientComponentsWrapper />
      </ClientOnly>

      <Navbar />

      {/* Hero Section - Consistent padding */}
      <section className="relative min-h-screen flex items-center px-6 sm:px-8 py-24 border-b border-gray-200 dark:border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black opacity-80 z-0"></div>

        <div className="container mx-auto z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <ScrollReveal>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  <TextShimmer className="block mb-2">SHAHID HUSSAIN</TextShimmer>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                    <TypedText />
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-8">
                  Creating digital experiences that blend creativity with technical excellence. Specialized in building
                  modern web applications with React and Node.js.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="flex flex-wrap gap-4 mb-8">
                  <LiquidButton
                    href="#projects"
                    color="emerald"
                    className="flex items-center justify-center gap-2 min-w-[140px] h-11 text-sm font-medium"
                  >
                    View Projects
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </LiquidButton>
                  <LiquidButton
                    href="#contact"
                    color="cyan"
                    className="flex items-center justify-center min-w-[140px] h-11 text-sm font-medium"
                  >
                    Contact Me
                  </LiquidButton>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <div className="flex flex-wrap gap-4">
                  <Magnetic strength={25}>
                    <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                      <Github className="w-6 h-6" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={25}>
                    <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                      <Linkedin className="w-6 h-6" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={25}>
                    <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                      <Twitter className="w-6 h-6" />
                    </a>
                  </Magnetic>
                  <Magnetic strength={25}>
                    <a href="#" className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                      <Mail className="w-6 h-6" />
                    </a>
                  </Magnetic>
                </div>
              </ScrollReveal>
            </div>

            <div className="order-1 md:order-2 flex justify-center">
              <ParallaxSection speed={0.1}>
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-emerald-400/20 dark:border-cyan-400/20 shadow-2xl">
                  <Image
                    src="/images/Hussain.JPG"
                    alt="Shahid Hussain"
                    fill
                    className="object-cover"
                    priority
                  />
                    <div className="w-full h-full bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
                      {/* Priority image for above the fold */}
                      <Image
                        src="/placeholder.svg?height=400&width=400"
                        alt="Alex Morgan"
                        className="w-full h-full object-cover"
                        width={400}
                        height={400}
                        priority
                      />
                    </div>
                </div>
              </ParallaxSection>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider color="rgba(16, 185, 129, 0.1)" className="dark:opacity-30" />

      {/* About Section - Consistent padding */}
      <section id="about" className="relative py-20 sm:py-24 md:py-28 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <ParallaxSection speed={0.15} direction="down">
            <div className="flex justify-center">
              <Card3D className="aspect-square rounded-2xl overflow-hidden w-4/5">
                <div className="w-full h-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20">
                  <Image
                    src="/images/Hussain.JPG"
                    alt="Shahid Hussain"
                    className="w-full h-full object-cover"
                    width={600}
                    height={600}
                    priority
                  />
                </div>
              </Card3D>
            </div>
          </ParallaxSection>

          <div>
            <ScrollReveal>
              <TextShimmer className="text-3xl font-bold mb-6 tracking-tight">About Me</TextShimmer>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                I'm a passionate full-stack developer with 0.5+ years of experience crafting digital solutions that solve
                real-world problems.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                My journey in tech began with a curiosity about how things work, which evolved into a career building
                elegant, efficient, and user-focused applications.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-4">
              <ScrollReveal delay={0.4} direction="left">
                <Card3D className="p-4 rounded-xl bg-white/5 backdrop-blur-sm h-full">
                  <h3 className="font-medium mb-2">Education</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    B.S. in Information Technology
                    <br />
                    GCUF(Ongoing)
                  </p>
                </Card3D>
              </ScrollReveal>

              <ScrollReveal delay={0.5} direction="right">
                <Card3D className="p-4 rounded-xl bg-white/5 backdrop-blur-sm h-full">
                  <h3 className="font-medium mb-2">Experience</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Full Stack Developer
                    <br />
                    Prasunet Company India
                  </p>
                </Card3D>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider color="rgba(6, 182, 212, 0.1)" flip className="dark:opacity-30" />

      {/* Skills Section - Consistent padding */}
      <section id="skills" className="relative py-20 sm:py-24 md:py-28 px-6 sm:px-8 overflow-hidden">
        <div className="flex flex-col items-center">
          <ScrollReveal>
            <TextShimmer className="text-3xl font-bold mb-12 tracking-tight text-center">Technical Skills</TextShimmer>
          </ScrollReveal>

          <ScrollReveal delay={0.2} width="100%">
            <Suspense fallback={<LoadingFallback />}>
              <div className="w-full flex justify-center">
                <SkillOrb />
              </div>
            </Suspense>
          </ScrollReveal>
        </div>
      </section>

      <WaveDivider color="rgba(16, 185, 129, 0.1)" className="dark:opacity-30" />

      {/* Projects Section - Consistent padding */}
      <section id="projects" className="relative py-20 sm:py-24 md:py-28 px-6 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <TextShimmer className="text-3xl font-bold mb-12 tracking-tight text-center">Featured Projects</TextShimmer>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollReveal delay={0.1}>
              <Suspense fallback={<LoadingFallback />}>
                <ProjectCard
                  title="News App"
                  description="A modern news application with real-time updates and personalized content delivery."
                  tags={["React", "Node.js", "MongoDB"]}
                  image="/images/news.jpg"
                  demoUrl="https://fake-news-detector1.vercel.app/"
                />
              </Suspense>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Suspense fallback={<LoadingFallback />}>
                <ProjectCard
                  title="Portfolio Website"
                  description="A responsive portfolio website showcasing projects and skills with modern UI/UX design."
                  tags={["Next.js", "Tailwind CSS", "Framer Motion"]}
                  image="/images/portfolio.jpg"
                  
                />
              </Suspense>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Suspense fallback={<LoadingFallback />}>
                <ProjectCard
                  title="Solar Energy Tracker"
                  description="A system for monitoring and optimizing solar energy production with real-time analytics."
                  tags={["React", "Python", "IoT"]}
                  image="/images/solar.jpg"
                  demoUrl="https://jutt-project.vercel.app/"
                />
              </Suspense>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <Suspense fallback={<LoadingFallback />}>
                <ProjectCard
                  title="Real-time Collaboration Tool"
                  description="Platform enabling teams to work together on documents with live updates."
                  tags={["WebSockets", "React", "Express"]}
                  image="/placeholder.svg?height=400&width=600"
                />
              </Suspense>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <Suspense fallback={<LoadingFallback />}>
                <ProjectCard
                  title="Financial Dashboard"
                  description="Interactive visualization of financial data with predictive analytics."
                  tags={["D3.js", "TypeScript", "AWS"]}
                  image="/placeholder.svg?height=400&width=600"
                />
              </Suspense>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <Suspense fallback={<LoadingFallback />}>
                <ProjectCard
                  title="Smart Home Controller"
                  description="IoT system for managing connected home devices through a single interface."
                  tags={["IoT", "React", "Node.js"]}
                  image="/placeholder.svg?height=400&width=600"
                />
              </Suspense>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <WaveDivider color="rgba(6, 182, 212, 0.1)" flip className="dark:opacity-30" />

      {/* Contact Section - Consistent padding */}
      <section id="contact" className="relative py-20 sm:py-24 md:py-28 px-6 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <TextShimmer className="text-3xl font-bold mb-12 tracking-tight text-center">Get In Touch</TextShimmer>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <ScrollReveal delay={0.2} direction="left" className="md:col-span-1 flex justify-center">
                <ContactFormAlt />
              </ScrollReveal>

              <ScrollReveal delay={0.3} direction="right" className="md:col-span-1">
                <div>
                  <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your
                    vision.
                  </p>

                  <div className="space-y-3">
                    <Card3D className="overflow-hidden rounded-xl">
                      <a
                        href="mailto:shahidx345@gmail.com"
                        className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <Mail className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm">shahidx345@gmail.com</span>
                      </a>
                    </Card3D>

                    <Card3D className="overflow-hidden rounded-xl">
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <Github className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm">https://github.com/shahidx345-shahid</span>
                      </a>
                    </Card3D>

                    <Card3D className="overflow-hidden rounded-xl">
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <Linkedin className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm">https://www.linkedin.com/in/shahid-hussain-765ab8330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app</span>
                      </a>
                    </Card3D>

                    <Card3D className="overflow-hidden rounded-xl">
                      <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-all"
                      >
                        <Twitter className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm">https://x.com/ShahidHuss64761?t=Rq3_sujDsWGH8fowDbKSqA&s=09</span>
                      </a>
                    </Card3D>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Consistent padding */}
      <footer className="py-10 sm:py-12 px-6 sm:px-8 border-t border-gray-200 dark:border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold">SHAHID HUSSAIN</h3>
            <p className="text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} All Rights Reserved</p>
          </div>

          <div className="flex gap-4">
            <Magnetic strength={30}>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
            </Magnetic>

            <Magnetic strength={30}>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Magnetic>

            <Magnetic strength={30}>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </Magnetic>

            <Magnetic strength={30}>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </footer>
    </main>
  )
}
