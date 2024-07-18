import React from "react";

const awardsData = [
  {
    id: 1,
    title: "First place Bogotá",
    imgUrl: "images/awards/FirstPlaceBogotá.jpg", 
  },
  {
    id: 2,
    title: "First Place Envigado Competition",
    imgUrl: "images/awards/FirstPlaceEnvigadoCompetition.jpg",
  },
  {
    id: 3,
    title: "Institutional robotics champion",
    imgUrl: "images/awards/institutionalChampion.jpg",
  },
];

const AwardsSection = () => {
  return (
    <section id="awards" className="py-16 bg-[#1a1a1a] text-white">
      <h2 className="text-center text-4xl font-bold mb-8">Awards</h2>
      <div className="flex justify-center gap-8">
        {awardsData.map((award) => (
          <div key={award.id} className="flex flex-col items-center">
            <img
              src={award.imgUrl}
              alt={award.title}
              className="w-36 h-36 md:w-48 md:h-48 rounded-full object-contain"
            />
            <h3 className="mt-4 text-xl">{award.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AwardsSection;
