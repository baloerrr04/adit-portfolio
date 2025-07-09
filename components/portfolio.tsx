"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { projects } from "@/data/projects";
import Link from "next/link";
import { skills } from "@/data/skills";

export default function Portfolio() {
  const [projectImageIndex, setProjectImageIndex] = useState<{
    [key: number]: number;
  }>({});

  // Initialize image indices for all projects
  useEffect(() => {
    const initialIndices: { [key: number]: number } = {};
    projects.forEach((_, index) => {
      initialIndices[index] = 0;
    });
    setProjectImageIndex(initialIndices);
  }, []);

  // Auto-slide images for projects
  useEffect(() => {
    const interval = setInterval(() => {
      setProjectImageIndex((prev) => {
        const newIndices = { ...prev };
        projects.forEach((project, index) => {
          if (project.images && project.images.length > 1) {
            newIndices[index] = (prev[index] + 1) % project.images.length;
          }
        });
        return newIndices;
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const nextImage = (projectIndex: number) => {
    setProjectImageIndex((prev) => ({
      ...prev,
      [projectIndex]:
        (prev[projectIndex] + 1) % projects[projectIndex].images.length,
    }));
  };

  const prevImage = (projectIndex: number) => {
    setProjectImageIndex((prev) => ({
      ...prev,
      [projectIndex]:
        prev[projectIndex] === 0
          ? projects[projectIndex].images.length - 1
          : prev[projectIndex] - 1,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full bg-gray-100 border-b-4 border-black z-50 p-4"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black text-black"
          >
            MUHAMMAD AKBAR ADITYAH
          </motion.h1>
          <div className="hidden md:flex space-x-6">
            {["About", "Projects"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-black font-bold hover:bg-black hover:text-gray-100 px-3 py-1 border-2 border-black transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        id="hero"
        className="pt-24 pb-16 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div variants={itemVariants}>
              <motion.h1
                className="text-6xl md:text-8xl font-black text-black mb-6 leading-none"
                whileHover={{ scale: 1.02 }}
              >
                Software
                <span className="block text-gray-600">DEVELOPER</span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-700 mb-8 font-bold"
                variants={itemVariants}
              >
                Saya adalah developer dengan minat di pengembangan full-stack
                dan sistem terintegrasi IoT. Terbiasa membangun aplikasi web,
                mobile, dan REST API menggunakan Laravel, React Native, dan
                Next.js.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                variants={itemVariants}
              >
                <motion.button
                  whileHover={{ scale: 1.05, rotate: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-cyan-400 text-black px-8 py-4 border-4 border-black font-black text-lg hover:bg-cyan-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
                >
                  <Download size={20} />
                  <Link
                    href={
                      "https://docs.google.com/document/d/1lX5uJXg10WzoUPlSQsJ0dusYi5IWJn7NMOEBkNjHyYI/edit?usp=sharing"
                    }
                  >
                    DOWNLOAD CV
                  </Link>
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <motion.div
                whileHover={{ rotate: 2 }}
                className="bg-gray-200 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="bg-white border-4 border-black h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-300 border-4 border-black mx-auto mb-4 flex items-center justify-center">
                      <div className="text-center">
                        <Image
                          src="/profile.jpeg"
                          fill
                          className="object-cover"
                          alt="profile"
                        />
                      </div>
                    </div>
                    <p className="font-bold text-black">YOUR PHOTO HERE</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-16 px-4 bg-white font-sans"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-black text-black mb-12 text-center border-4 border-black bg-gray-200 p-4 inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            TENTANG SAYA
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <h3 className="text-2xl font-black text-pink-500 mb-4">
                EXPERIENCE
              </h3>
              <p className="font-bold text-black">
                Saya seorang Software Developer dengan pengalaman lebih dari 3
                tahun dalam membangun aplikasi web dan mobile modern, backend
                API, dan integrasi sistem berbasis IoT. Terbiasa menggunakan
                teknologi seperti Laravel, Next.js, React Native, dan Firebase.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <h3 className="text-2xl font-black text-cyan-500 mb-4">
                EDUCATION
              </h3>
              <p className="font-bold text-black">
                D3 Teknik Komputer, Politeknik Negeri Sriwijaya (2022-2025).
                GPA: 3.8/4.0.
              </p>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-16 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-black text-black mb-12 text-center border-4 border-black bg-gray-200 p-4 inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            PROJECTS
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
                className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
              >
                {/* Image Slider */}
                <div className="relative h-48 bg-gray-200 border-b-4 border-black overflow-hidden group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${index}-${projectImageIndex[index] || 0}`}
                      src={project.images[projectImageIndex[index] || 0]}
                      alt={`${project.title} screenshot ${
                        (projectImageIndex[index] || 0) + 1
                      }`}
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>

                  {/* Navigation Arrows */}
                  <motion.button
                    onClick={() => prevImage(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={16} />
                  </motion.button>

                  <motion.button
                    onClick={() => nextImage(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={16} />
                  </motion.button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {project.images.map((_, imgIndex) => (
                      <motion.button
                        key={imgIndex}
                        onClick={() =>
                          setProjectImageIndex((prev) => ({
                            ...prev,
                            [index]: imgIndex,
                          }))
                        }
                        whileHover={{ scale: 1.2 }}
                        className={`w-2 h-2 border border-white ${
                          (projectImageIndex[index] || 0) === imgIndex
                            ? "bg-white"
                            : "bg-black bg-opacity-50"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Image Counter */}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 text-xs font-bold border border-white">
                    {(projectImageIndex[index] || 0) + 1}/
                    {project.images.length}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-black text-black mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-800 font-bold mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gray-300 text-black px-3 py-1 border-2 border-black font-bold text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <motion.a
                      href={project.link}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-800 text-white px-4 py-2 border-2 border-black font-bold flex items-center gap-2 hover:bg-gray-900 transition-colors"
                    >
                      <ExternalLink size={16} />
                      LIVE
                    </motion.a>
                    <motion.a
                      href={project.github}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-200 text-black px-4 py-2 border-2 border-black font-bold flex items-center gap-2 hover:bg-gray-300 transition-colors"
                    >
                      <Github size={16} />
                      CODE
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      {/* <motion.section
        id="skills"
        className="py-16 px-4 bg-gray-100"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-black text-black mb-12 text-center border-4 border-black bg-white p-4 inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            SKILLS
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-3xl font-black text-black mb-6 bg-gray-200 p-2 border-2 border-black text-center">
                  {skillGroup.category}
                </h3>
                <div className="space-y-3">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      whileHover={{ x: 5 }}
                      className="bg-gray-300 text-black px-4 py-2 border-2 border-black font-bold"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section> */}

      {/* Contact Section */}
      {/* <motion.section
        id="contact"
        className="py-16 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            variants={itemVariants}
            className="text-5xl font-black text-black mb-12 text-center border-4 border-black bg-gray-200 p-4 inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            CONTACT
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div
                whileHover={{ x: 5 }}
                className="bg-gray-200 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4"
              >
                <Mail className="text-black" size={24} />
                <div>
                  <h3 className="font-black text-black">EMAIL</h3>
                  <p className="font-bold text-gray-700">john.doe@email.com</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="bg-gray-300 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4"
              >
                <Phone className="text-black" size={24} />
                <div>
                  <h3 className="font-black text-black">PHONE</h3>
                  <p className="font-bold text-gray-700">+62 812 3456 7890</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="bg-gray-400 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4"
              >
                <MapPin className="text-black" size={24} />
                <div>
                  <h3 className="font-black text-black">LOCATION</h3>
                  <p className="font-bold text-gray-700">Jakarta, Indonesia</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <h3 className="text-3xl font-black text-black mb-6">
                KIRIM PESAN
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="NAMA"
                  className="w-full p-4 border-4 border-black font-bold placeholder-gray-600 focus:outline-none focus:bg-yellow-100"
                />
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="w-full p-4 border-4 border-black font-bold placeholder-gray-600 focus:outline-none focus:bg-yellow-100"
                />
                <textarea
                  placeholder="PESAN"
                  rows={4}
                  className="w-full p-4 border-4 border-black font-bold placeholder-gray-600 focus:outline-none focus:bg-yellow-100"
                />
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gray-800 text-white py-4 border-4 border-black font-black text-lg hover:bg-gray-900 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  KIRIM PESAN
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section> */}

      {/* Footer */}
      <motion.footer
        className="bg-black text-white py-8 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-6">
            {[
              { icon: Github, link: "https://github.com/baloerrr04" },
              {
                icon: Linkedin,
                link: "https://www.linkedin.com/in/muhammad-akbar-adityah/",
              },
              { icon: Mail, link: "mailto:akbaradityah444@gmail.com" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                className="bg-gray-200 text-black p-3 border-2 border-white hover:bg-gray-300 transition-colors"
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
          <p className="font-bold text-lg">
            © 2025 MUHAMMAD AKBAR ADITYAH. ALL RIGHTS RESERVED.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
