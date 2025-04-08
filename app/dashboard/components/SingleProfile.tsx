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
    <section className="relative flex h-[950px] w-full flex-col rounded-md">
      <div className="relative h-[250px] w-full rounded-md">
        <Image
          src="https://thumbs.dreamstime.com/z/3d-blue-space-14179501.jpg?ct=jpeg"
          alt="Profile"
          fill
          className="h-full w-full rounded-md object-cover object-center"
        />
      </div>
      <div className="absolute left-[2.5%] top-[220px] flex h-[700px] w-[95%] flex-col items-start justify-between gap-3 rounded-md bg-light-bgw/95 p-4 pt-8 dark:bg-dark-bg/90">
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
          <div className="w-[30%]">Platform Settings</div>
          <div className="flex h-full w-full flex-col items-start justify-between gap-4">
            <h4>Profile Information</h4>
            <p>
              Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer
              is no. If two equally difficult paths, choose the one more painful
              in the short term (pain avoidance is creating an illusion of
              equality).
            </p>
            <span className="text-[20px] font-semibold capitalize text-light-text dark:text-dark-text">
              {user?.username}
            </span>
            <span> {user?.email}</span>
            <span> {user?.role}</span>
          </div>
          <div className="w-[30%]">
            <h1>Convarsation</h1>
          </div>
        </div>
        <div className="flex h-auto w-full flex-col items-start justify-between gap-4">
          <div>Projects</div>

          <div className="flex h-full w-full items-center justify-between gap-4">
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
    <div className="flex h-[260px] w-full flex-col items-center justify-between rounded-md bg-light-bg text-left shadow-md transition duration-200 hover:scale-[1.01] dark:bg-dark-bg-b">
      <Image
        src={project.photo}
        alt="Project"
        width={200}
        height={200}
        className="h-[120px] w-full rounded-t-md object-cover object-center"
      />
      <div className="flex h-auto w-full flex-col items-start justify-between gap-2 p-2 text-left">
        <div className="flex h-auto w-full flex-col items-start justify-between gap-1">
          <p>{project.name}</p>
          <h4 className="text-[15px] font-semibold capitalize text-light-text dark:text-dark-text">
            {project.title}
          </h4>
        </div>
        <p className="line-clamp-2">{project.body}</p>
        <section className="mb-1 mt-1 flex w-full items-center justify-between gap-4">
          <button className="rounded-md border-[0.3px] border-cyan-700 px-2 py-[2px] text-[12px] font-semibold text-gray-500/80 transition duration-200 hover:bg-gray-500/10">
            View Project
          </button>
          <div className="relative flex h-[10px] w-[50px] items-center justify-end">
            <span className="absolute left-5 top-0 h-5 w-5 rounded-full bg-green-400"></span>
            <span className="absolute left-3 top-0 h-5 w-5 rounded-full bg-red-400"></span>
            <span className="absolute left-1 top-0 h-5 w-5 rounded-full bg-orange-400"></span>
            <span className="absolute -left-1 top-0 h-5 w-5 rounded-full bg-red-900"></span>
          </div>
        </section>
      </div>
    </div>
  );
};
