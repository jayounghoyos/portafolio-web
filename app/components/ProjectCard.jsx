import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ title, description, imgUrl, modelEmbed, gitUrl, previewUrl }) => {
  return (
    <div className="project-card border rounded-lg overflow-hidden">
      {modelEmbed ? (
        <div className="sketchfab-embed-wrapper">
          <iframe
            title={title}
            frameBorder="0"
            allowFullScreen
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            src={modelEmbed}
          >
          </iframe>
          <p style={{ fontSize: "13px", fontWeight: "normal", margin: "5px", color: "#4A4A4A" }}>
            <a href={modelEmbed.replace("/embed", "")} target="_blank" rel="nofollow" style={{ fontWeight: "bold", color: "#1CAAD9" }}>{title}</a> by <a href="https://sketchfab.com/juanandresyounghoyos" target="_blank" rel="nofollow" style={{ fontWeight: "bold", color: "#1CAAD9" }}>juanandresyounghoyos</a> on <a href="https://sketchfab.com" target="_blank" rel="nofollow" style={{ fontWeight: "bold", color: "#1CAAD9" }}>Sketchfab</a>
          </p>
        </div>
      ) : (
        <img src={imgUrl} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-[#ADB7BE] mt-2">{description}</p>
        <div className="mt-4">
          <a href={gitUrl} className="text-primary-500 hover:underline">
            GitHub
          </a>
          <a href={previewUrl} className="ml-4 text-primary-500 hover:underline">
            Live Preview
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;