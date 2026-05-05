export type StackRow = {
  category: string;
  items: string[];
};

export const stack: StackRow[] = [
  {
    category: "Languages",
    items: ["TypeScript", "Python", "C++", "Java", "SQL"],
  },
  {
    category: "Web",
    items: ["Next.js", "React", "Node", "Tailwind", "Vercel"],
  },
  {
    category: "Machine Learning",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "NumPy", "OpenCV"],
  },
  {
    category: "Robotics",
    items: ["Onshape", "Arduino", "Raspberry Pi", "ROS basics", "ST7789"],
  },
  {
    category: "Infrastructure",
    items: ["Docker", "Postgres", "GitHub Actions", "Linux"],
  },
];
