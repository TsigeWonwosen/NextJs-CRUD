"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { avatars } from "./SingleProfile";

export default function ResponsiveCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Handle dot navigation
  const goToSlide = (index: number) => {
    setActiveIndex(index);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  // Update active index on scroll
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleScroll = () => {
      const newIndex = Math.round(carousel.scrollLeft / carousel.offsetWidth);
      setActiveIndex(newIndex);
    };

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
  }, []);

  // Draggable functionality
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust multiplier for faster/slower dragging
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!carouselRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full">
      <div
        className={`hidden gap-3 md:grid md:grid-cols-2 lg:grid-cols-4 ${isMobile ? "hidden" : "block"}`}
      >
        {Projects.map((card, index) => (
          <ProjectCard key={index} project={card} />
        ))}
      </div>

      {/* Carousel for mobile screens */}
      <div className={`md:hidden ${isMobile ? "grid w-full" : "hidden"}`}>
        <div
          ref={carouselRef}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
          style={{
            scrollbarWidth: "none",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {Projects.map((card, index) => (
            <div key={index} className="w-full flex-shrink-0 snap-center px-2">
              <ProjectCard key={index} project={card} />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="mt-4 flex w-full justify-center space-x-2">
          {Projects.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-colors ${activeIndex === index ? "bg-blue-500/80" : "bg-gray-300"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const Projects = [
  {
    id: 1,
    name: "Project 1",
    title: "Modern",
    body: "As Uber works through a huge amount of internal management turmoil.",
    photo: "/home-decor1.jpg",
  },
  {
    id: 1,
    name: "Project 2",
    title: "Scandinavian",
    body: "Music is something that every person has his or her own specific opinion about.",
    photo: "/home-decor2.jpg",
  },
  {
    id: 1,
    name: "Project 3",
    title: "Minimalist",
    body: "Different people have different taste, and various types of music. Music is life.",
    photo: "/home-decor3.jpg",
  },
  {
    id: 1,
    name: "Project 4",
    title: "Gothic",
    body: "Why would anyone pick blue over pink? Pink is obviously a better color.",
    photo: "/home-decor4.jpg",
  },
];

const ProjectCard = ({ project }: { project: any }) => {
  return (
    // <div className="flex h-auto w-full min-w-[230px] flex-col items-center justify-between rounded-md bg-light-bg text-left shadow-md transition duration-300 dark:bg-dark-bg-b sm:w-[48%] lg:w-[23%]">
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-md bg-light-bg text-left shadow-md transition duration-300 dark:bg-dark-bg-b">
      <Image
        src={project.photo}
        alt="Project"
        width={200}
        height={200}
        className="h-[120px] w-full rounded-t-md object-cover object-center"
      />
      <div className="flex h-auto w-full flex-col items-start justify-between gap-3 px-3 py-3 text-left">
        <div className="flex h-auto w-full flex-col items-start justify-between gap-1">
          <p className="text-[10px] font-normal">{project.name}</p>
          <h4 className="text-[15px] font-semibold capitalize text-light-text dark:text-dark-text/80">
            {project.title}
          </h4>
        </div>
        <p className="line-clamp-2 text-light-text/80 dark:text-dark-text/60">
          {project.body}
        </p>
        <section className="mb-1 mt-1 flex w-full items-center justify-between gap-4">
          <button className="rounded-md border-[0.3px] border-cyan-700 px-2 py-[2px] text-[12px] font-semibold text-gray-500/80 transition duration-200 hover:bg-gray-500/10">
            View Project
          </button>
          <div className="flex items-center justify-end">
            {avatars.map((src, index) => (
              <div
                key={index}
                className={`group relative h-6 w-6 rounded-full border-1 border-light-bgw dark:border-dark-text ${
                  index !== 0 ? "-ml-2" : ""
                } transition duration-200 hover:z-10`}
              >
                <Image
                  src={src.src}
                  alt={src.name}
                  fill
                  className="rounded-full object-cover transition-transform duration-200 group-hover:scale-125"
                />
                <div className="absolute -bottom-10 left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-sm bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="relative flex h-full w-full items-center justify-center gap-1">
                    {src.name}
                    <span className="absolute -top-2 right-3 h-2 w-2 rotate-45 bg-black"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
