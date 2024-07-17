"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Robot Desinfectante IENDE",
    description: "A robot designed for disinfection.",
    modelEmbed: "https://sketchfab.com/models/e44f2f205d624b7b9e5a6f4c18399a85/embed",
    tag: ["All", "Robotics"],
    gitUrl: "https://github.com/yourusername/robot-desinfectante",
    previewUrl: "https://yourwebsite.com/robot-desinfectante",
  },
  {
    id: 2,
    title: "Tinker",
    description: "A 3D model named Tinker.",
    modelEmbed: "https://sketchfab.com/models/49c4e2e2b09849d5a4a5f968fbb66fe2/embed",
    tag: ["All", "3D Models"],
    gitUrl: "https://github.com/yourusername/tinker",
    previewUrl: "https://yourwebsite.com/tinker",
  },
  {
    id: 3,
    title: "Mechanical Design",
    description: "A mechanical design for a project.",
    imgUrl: "images/projects/3.png",
    tag: ["All", "Mechanical"],
    gitUrl: "https://github.com/yourusername/mechanical-design",
    previewUrl: "https://yourwebsite.com/mechanical-design",
  },
  {
    id: 4,
    title: "Food Ordering Application",
    description: "Project 4 description",
    imgUrl: "images/projects/4.png",
    tag: ["All", "Mobile"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 5,
    title: "React Firebase Template",
    description: "Authentication and CRUD operations",
    imgUrl: "images/projects/5.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Full-stack Roadmap",
    description: "Project 5 description",
    imgUrl: "images/projects/6.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
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
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Robotics"
          isSelected={tag === "Robotics"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="3D Models"
          isSelected={tag === "3D Models"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mechanical"
          isSelected={tag === "Mechanical"}
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
