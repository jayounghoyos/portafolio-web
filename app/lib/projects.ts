export type Tier = "selected" | "study" | "experiment";

export type Project = {
  id: string;
  title: string;
  year: string;
  blurb: string;
  domain: string;
  tier: Tier;
  /** Lifecycle stage shown on spec strips. */
  stage: "shipped" | "study" | "filed";
  /** Short stack hint shown on spec strips. */
  stackHint: string;
  imgUrl?: string;
  href?: string;
  repo?: string;
  lesson?: string;
};

export const projects: Project[] = [
  {
    id: "higiea",
    title: "Higiea",
    year: "2021",
    blurb:
      "Autonomous disinfection robot for hospital environments during COVID-19. Designed for path planning across patient rooms with onboard UV-C control.",
    domain: "Robotics · Embedded",
    tier: "selected",
    stage: "shipped",
    stackHint: "ROS · sensors",
    imgUrl: "/images/projects/higiea.png",
    href: "https://sketchfab.com/models/e44f2f205d624b7b9e5a6f4c18399a85",
  },
  {
    id: "magneto-ads",
    title: "Magneto Ads",
    year: "2024",
    blurb:
      "Job-recommendation MVP: a classification model trained on listing/applicant features, served behind a Next.js front end. ML and full-stack in one ship.",
    domain: "ML · Full-stack",
    tier: "selected",
    stage: "shipped",
    stackHint: "next.js · sklearn",
    imgUrl: "/images/projects/Magneto_ads.jpg",
    href: "https://ads-automation-xryl.vercel.app/",
    repo: "https://github.com/jayounghoyos/ads_automation",
  },
  {
    id: "claw-robot",
    title: "Claw Robot",
    year: "2022",
    blurb:
      "Articulated claw-arm robot built for grabbing competitions. Tuned for precise low-latency control under contact loads.",
    domain: "Robotics · Mechanical",
    tier: "selected",
    stage: "shipped",
    stackHint: "arduino · servos",
    imgUrl: "/images/projects/close.jpeg",
    href: "https://sketchfab.com/models/49c4e2e2b09849d5a4a5f968fbb66fe2",
  },
  {
    id: "xbox-car",
    title: "Xbox-controlled RPi Car",
    year: "2023",
    blurb:
      "Drive-by-gamepad firmware for a Raspberry Pi 4 chassis — Bluetooth HID input, motor controller PWM, latency-tuned event loop.",
    domain: "Robotics · Systems",
    tier: "selected",
    stage: "shipped",
    stackHint: "rpi · websocket",
    repo: "https://github.com/jayounghoyos/xbox_controller_car_raspberrypi4B",
    href: "https://github.com/jayounghoyos/xbox_controller_car_raspberrypi4B",
  },
  {
    id: "game-recs",
    title: "Game Recommendations",
    year: "2023",
    blurb:
      "Scikit-learn classifier recommending games by player age. A first hands-on with feature engineering and model evaluation.",
    domain: "ML · Study",
    tier: "study",
    stage: "study",
    stackHint: "python · sklearn",
    imgUrl: "/images/projects/gameRecommendations.png",
    repo: "https://github.com/jayounghoyos/machineLearningUdemy",
    lesson: "First time owning the full feature → train → evaluate loop.",
  },
  {
    id: "celsius-nn",
    title: "Celsius → Fahrenheit",
    year: "2023",
    blurb:
      "A single-neuron TensorFlow network learning a linear map. Deliberately tiny — built to make backprop concrete.",
    domain: "ML · Study",
    tier: "study",
    stage: "study",
    stackHint: "tensorflow",
    imgUrl: "/images/projects/neuron.png",
    repo: "https://github.com/jayounghoyos/FIRST_neural_network",
    lesson: "Loss curves and weights matter more than architecture at this scale.",
  },
  {
    id: "movies-graph",
    title: "Movies 3D Graph",
    year: "2022",
    blurb: "3D visualization of an IMDB dataset for a data structures course.",
    domain: "Data viz",
    tier: "experiment",
    stage: "filed",
    stackHint: "three.js · python",
    repo: "https://github.com/jayounghoyos/Parcial-3-Datos-Algoritmos",
  },
  {
    id: "rickrollprinter",
    title: "rickrollprinter",
    year: "2022",
    blurb: "Python package on PyPI. Exactly what it sounds like.",
    domain: "Python · PyPI",
    tier: "experiment",
    stage: "filed",
    stackHint: "python · pypi",
    href: "https://pypi.org/project/rickrollprinter/0.1.3/",
  },
  {
    id: "rick-display",
    title: "ST7789 Rickroll",
    year: "2022",
    blurb: "Static rickroll on an ST7789 display driven by an Arduino Uno.",
    domain: "Embedded",
    tier: "experiment",
    stage: "filed",
    stackHint: "arduino · st7789",
    repo: "https://github.com/jayounghoyos/st7789-arduino-uno",
  },
];

export const selected = projects.filter((p) => p.tier === "selected");
export const studies = projects.filter((p) => p.tier === "study");
export const experiments = projects.filter((p) => p.tier === "experiment");
