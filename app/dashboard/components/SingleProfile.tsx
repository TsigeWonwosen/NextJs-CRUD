"use client";
import { Edit } from "lucide-react";
import Image from "next/image";
import ResponsiveCards from "./ResponsiveCards";
import Performance from "@/app/components/Performance";

function SingleProfile({
  user,
  handleEditeUser,
}: {
  user: any;
  handleEditeUser: (id: string) => void;
}) {
  return (
    <section className="flex h-full w-full flex-col rounded-md pb-4">
      <div className="relative h-[200px] w-full rounded-md sm:h-[300px]">
        <Image
          src="/blue-space.jpg"
          alt="Profile"
          fill
          className="h-full w-full rounded-md object-cover object-center"
        />
      </div>
      <div className="z-10 -mt-[50px] flex h-full w-full flex-col items-start justify-between gap-4 rounded-md bg-light-bgw/95 p-4 dark:bg-dark-bg/90 sm:mx-auto sm:-mt-[60px] sm:w-[98%] md:w-[98%]">
        <div className="mb-8 flex h-auto w-full items-center justify-between gap-6">
          <div className="flex h-auto w-full items-center justify-between gap-4 md:w-[30%]">
            <Image
              src={user?.img || "/images/user.png"}
              alt="Profile"
              width={200}
              height={200}
              className="h-[70px] w-[100px] rounded-md object-cover object-center sm:h-[100px]"
            />
            <section className="flex h-full w-full flex-col items-start justify-start gap-1 text-left">
              <span className="text-[20px] font-semibold capitalize text-light-text dark:text-dark-text">
                {user?.username}
              </span>
              <span className="text-[14px] text-light-text/80 dark:text-dark-text/80">
                {" "}
                {user?.role}
              </span>
            </section>
          </div>
          <div className="flex h-full w-full items-center justify-end gap-5 px-4 text-center">
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
        <div className="flex h-full w-full flex-col items-start justify-between gap-8 md:flex-row md:gap-4">
          <div className="flex h-full w-full flex-col items-center justify-start">
            <h1 className="w-full text-left text-base font-bold capitalize text-light-text/90 dark:text-dark-text">
              Performance
            </h1>
            <Performance />
          </div>
          <div className="flex h-full w-full flex-col items-center justify-start gap-4 md:px-4">
            <h1 className="w-full text-left text-base font-bold capitalize text-light-text/90 dark:text-dark-text">
              Profile Information
            </h1>
            <section className="w-full text-left">
              <p className="text-[13px] text-light-text/70 dark:text-dark-text/70">
                Hi, I’m {user.username}, Decisions: If you can’t decide, the
                answer is no. If two equally difficult paths, choose the one
                more painful in the short term (pain avoidance is creating an
                illusion of equality).
              </p>
            </section>
            <section className="flex h-auto w-full flex-col items-center justify-center gap-2">
              <div className="flex h-full w-full items-center justify-start gap-1 text-left">
                <span className="text-sm font-semibold capitalize text-light-text dark:text-dark-text">
                  Name :
                </span>
                <p className="text-[13px] capitalize text-light-text/70 dark:text-dark-text/70">
                  {user?.username}
                </p>
              </div>
              <div className="flex h-full w-full items-center justify-start gap-1 text-left">
                <span className="text-sm font-semibold capitalize text-light-text dark:text-dark-text">
                  Email :
                </span>
                <p className="text-[13px] capitalize text-light-text/70 dark:text-dark-text/70">
                  {user?.email}
                </p>
              </div>
              <div className="flex h-full w-full items-center justify-start gap-1 text-left">
                <span className="text-sm font-semibold capitalize text-light-text dark:text-dark-text">
                  Role :
                </span>
                <p className="text-[13px] capitalize text-light-text/70 dark:text-dark-text/70">
                  {user?.role}
                </p>
              </div>
              <div className="flex h-full w-full items-center justify-start gap-1 text-left">
                <span className="text-sm font-semibold capitalize text-light-text dark:text-dark-text">
                  Phone :
                </span>
                <p className="text-[13px] capitalize text-light-text/70 dark:text-dark-text/70">
                  +1 234 567 890
                </p>
              </div>
            </section>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-start gap-4 md:px-3">
            <h1 className="w-full text-left text-base font-bold capitalize text-light-text/90 dark:text-dark-text">
              Convarsations
            </h1>
            <div className="flex h-auto w-full flex-col items-center justify-start gap-3">
              {avatars.map((src, index) => (
                <div
                  key={index}
                  className="flex h-full w-full items-center justify-between rounded-md"
                >
                  <div className="flex h-full w-full items-center justify-start gap-3">
                    <Image
                      src={src.src}
                      alt={src.name}
                      width={200}
                      height={200}
                      className="h-9 w-9 overflow-hidden rounded-md object-cover object-top"
                    />
                    <section className="flex flex-col items-start justify-start gap-1 text-left">
                      <span className="text-[14px] font-semibold capitalize">
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
        <div className="flex h-full w-full flex-col items-center justify-start gap-6 md:gap-4">
          <h1 className="w-full text-left text-base font-bold capitalize text-light-text/90 dark:text-dark-text">
            Projects
          </h1>
          <ResponsiveCards />
        </div>
      </div>
    </section>
  );
}

export default SingleProfile;

export const avatars = [
  {
    name: "Marta Doe",
    src: "/photo1.jpg",
    message: "Hi! I need more information..",
  },
  { name: "Alice T.", src: "/photo2.jpg", message: "Awesome work, can you.." },
  { name: "Steve K", src: "/photo3.jpg", message: "Have a great afternoon..." },
  {
    name: "Emma Taire",
    src: "/photo4.jpg",
    message: "Hi! I need more information.",
  },
];
