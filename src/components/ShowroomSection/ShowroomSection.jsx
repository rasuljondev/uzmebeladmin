"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ShowroomSection({ imageOnRight = true, data = {} }) {
  const { title = "Explore Our Showroom", description = "Discover the elegance and comfort...", image = "/assets/showroom.jpg" } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, duration: 0.2 } },
  };
  const textVariants = {
    hidden: { opacity: 0, x: imageOnRight ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };
  const imageVariants = {
    hidden: { opacity: 0, x: imageOnRight ? 50 : -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="py-20 px-16 bg-white">
      <motion.div
        className={`flex items-center justify-between max-w-5xl mx-auto gap-10 ${imageOnRight ? "flex-row" : "flex-row-reverse"}`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="flex-1 text-left" variants={textVariants}>
          <h2 className="text-4xl font-bold mb-5 text-gray-800">{title}</h2>
          <p className="text-lg text-gray-600">{description}</p>
        </motion.div>
        <motion.div className="flex-1" variants={imageVariants}>
          <Image
            src={image}
            alt="Showroom"
            width={600}
            height={400}
            loading="lazy"
            quality={75}
            className="rounded-xl shadow-lg object-cover"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}