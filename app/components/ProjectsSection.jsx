"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Higiea Disinfectant Robot",
    description: "A robot specifically designed for disinfection during COVID-19.",
    modelEmbed: "https://sketchfab.com/models/e44f2f205d624b7b9e5a6f4c18399a85/embed",
    tag: ["All", "Robotics"],
    previewUrl: "https://yourwebsite.com/robot-desinfectante",
  },
  {
    id: 2,
    title: "Claw Robot",
    description: "A versatile Claw-Arm robot designed for grabbing competitions. It features precise movement control and robust construction for competitive environments.",
    modelEmbed: "https://sketchfab.com/models/49c4e2e2b09849d5a4a5f968fbb66fe2/embed",
    tag: ["All", "Robotics"],
    previewUrl: "/",
  },
  {
    id: 3,
    title: "Movies 3D graph for data visualization",
    description: "A 3D graph for data visualization of movies with an imdb database",
    imgUrl: "images/projects/graph.jpeg",
    tag: ["All"],
    gitUrl: "https://github.com/jayounghoyos/Parcial-3-Datos-Algoritmos",
    previewUrl: "https://github.com/jayounghoyos/Parcial-3-Datos-Algoritmos",
  },
  {
    id: 4,
    title: "rickroll Display",
    description: "A static rickroll time!",
    imgUrl: "images/projects/rick.jpeg",
    tag: ["All", "Robotics"],
    gitUrl: "https://github.com/jayounghoyos/st7789-arduino-uno",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "upload my Python library",
    description: "Rickroll print library",
    imgUrl: "images/projects/package.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "https://pypi.org/project/rickrollprinter/0.1.3/",
  }
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="mb-10">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="MachineLearning"
          isSelected={tag === "MachineLearning"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Robotics"
          isSelected={tag === "Robotics"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.imgUrl}
              modelEmbed={project.modelEmbed}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
