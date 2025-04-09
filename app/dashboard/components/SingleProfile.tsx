import { Edit } from "lucide-react";
import Image from "next/image";

function SingleProfile({
  user,
  handleEditeUser,
}: {
  user: any;
  handleEditeUser: (id: string) => void;
}) {
  return (
    <section className="flex h-full w-full flex-col rounded-md px-1 pb-4 pt-0">
      <div className="relative h-[250px] w-full rounded-md">
        <Image
          src="https://thumbs.dreamstime.com/z/3d-blue-space-14179501.jpg?ct=jpeg"
          alt="Profile"
          fill
          className="h-full w-full rounded-md object-cover object-center"
        />
      </div>
      <div className="z-10 mx-auto -mt-[40px] flex h-full w-[97%] flex-col items-start justify-between gap-3 rounded-md bg-light-bgw/95 p-4 pt-8 dark:bg-dark-bg/90">
        <div className="flex h-auto w-full items-center justify-between gap-4">
          <div className="flex h-auto w-full items-center justify-between gap-4 md:w-[30%]">
            <Image
              src={user?.img || "/images/user.png"}
              alt="Profile"
              width={200}
              height={200}
              className="rounded-md object-cover object-center md:h-[100px] md:w-[100px]"
            />
            <section className="flex h-full w-full flex-col items-start justify-start gap-2 text-left">
              <span className="text-[20px] font-semibold capitalize text-light-text dark:text-dark-text">
                {user?.username}
              </span>
              <span className="text-[15px]"> {user?.role}</span>
            </section>
          </div>
          <div className="flex h-full w-full items-start justify-end gap-5 text-center">
            <button onClick={() => handleEditeUser(user._id)}>
              <Edit className="h-[15px] w-[15px] text-gray-500/80 transition duration-200 hover:text-gray-500" />
            </button>
            <button onClick={() => handleEditeUser(user._id)}>
              <Edit className="h-[15px] w-[15px] text-gray-500/80 transition duration-200 hover:text-gray-500" />
            </button>
            <button onClick={() => handleEditeUser(user._id)}>
              <Edit className="h-[15px] w-[15px] text-gray-500/80 transition duration-200 hover:text-gray-500" />
            </button>
          </div>
        </div>
        <div className="flex h-auto w-full items-start justify-between gap-4">
          <div className="flex h-full w-full flex-col items-center justify-start">
            <h1 className="w-full text-left text-lg font-bold capitalize text-light-text/90 dark:text-dark-text">
              Platform Settings
            </h1>
          </div>
          <div className="flex h-full w-full flex-col items-start justify-between gap-4">
            <h1 className="w-full text-left text-lg font-bold capitalize text-light-text/90 dark:text-dark-text">
              Profile Information
            </h1>
            <p>
              Hi, I’m {user.username}, Decisions: If you can’t decide, the
              answer is no. If two equally difficult paths, choose the one more
              painful in the short term (pain avoidance is creating an illusion
              of equality).
            </p>
            <span className="text-[20px] font-semibold capitalize text-light-text dark:text-dark-text">
              {user?.username}
            </span>
            <span> {user?.email}</span>
            <span> {user?.role}</span>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-start gap-2">
            <h1 className="w-full text-left text-lg font-bold capitalize text-light-text/90 dark:text-dark-text">
              Convarsations
            </h1>
            <div className="flex h-full w-full flex-col items-center justify-start gap-2">
              {avatars.map((src, index) => (
                <div
                  key={index}
                  className="flex h-full w-full items-center justify-between rounded-md"
                >
                  <div className="flex h-full w-full items-center justify-start gap-2">
                    <Image
                      src={src.src}
                      alt={src.name}
                      width={200}
                      height={200}
                      className="h-9 w-9 rounded-md border-1 border-light-bgw object-cover dark:border-dark-text"
                    />
                    <section className="flex flex-col items-start justify-start gap-1 text-left">
                      <span className="text-[13px] font-semibold capitalize">
                        {src.name}
                      </span>
                      <p className="text-[10px] text-light-text/70 dark:text-dark-text/70">
                        {src.message}
                      </p>
                    </section>
                  </div>
                  <button className="text-dark-button/90">Reply</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-start justify-between gap-4">
          <h1 className="w-full text-left text-lg font-bold capitalize text-light-text/90 dark:text-dark-text">
            Projects
          </h1>

          <div className="flex h-full w-full items-center justify-between gap-3">
            {Projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProfile;

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
    <div className="flex h-[280px] w-full flex-col items-center justify-between rounded-md bg-light-bg text-left shadow-md transition duration-300 dark:bg-dark-bg-b">
      <Image
        src={project.photo}
        alt="Project"
        width={200}
        height={200}
        className="h-[120px] w-full rounded-t-md object-cover object-center"
      />
      <div className="flex h-auto w-full flex-col items-start justify-between gap-3 p-2 px-3 text-left">
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

const avatars = [
  {
    name: "John",
    src: "/photo1.jpg",
    message: "Hi! I need more information..",
  },
  { name: "Alice", src: "/photo2.jpg", message: "Awesome work, can you.." },
  { name: "Steve", src: "/photo3.jpg", message: "Have a great afternoon..." },
  { name: "Emma", src: "/photo4.jpg", message: "Hi! I need more information." },
];
