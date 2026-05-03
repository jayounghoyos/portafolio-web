export type NowEntry = {
  label: string;
  body: string;
};

export const nowUpdated = "May 2026";

export const now: NowEntry[] = [
  {
    label: "Building",
    body:
      "A tubular-frame vehicle chassis modeled in Onshape, plus the perception and control stack to drive it. The CAD lives upstream of the web — same model floats in this site's hero.",
  },
  {
    label: "Studying",
    body:
      "Deep learning fundamentals (transformers, optimization), classical robotics (kinematics, SLAM), and the full-stack glue that turns a notebook into a product.",
  },
  {
    label: "Reading & watching",
    body:
      "Probabilistic Robotics (Thrun et al.), 3Blue1Brown's neural-net series, and whatever Anthropic and DeepMind publish. Notes turn into experiments turn into projects.",
  },
];
