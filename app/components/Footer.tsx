"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="h-auto w-full bg-light-bg px-8 py-6 text-light-text dark:bg-[#060819]/80 dark:text-slate-200/50">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
        <div className="mb-4 mt-2 text-center md:mb-0 md:text-left">
          <h1 className="text-lg font-normal">The Ethiopian</h1>
          <p className="text-sm">&copy; 2025 All rights reserved.</p>
        </div>

        <div className="flex space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 4.557a9.75 9.75 0 01-2.828.775A4.93 4.93 0 0023.337 3.1a9.864 9.864 0 01-3.127 1.197 4.921 4.921 0 00-8.38 4.482A13.978 13.978 0 011.64 3.161a4.821 4.821 0 00-.665 2.475c0 1.708.87 3.213 2.188 4.1a4.908 4.908 0 01-2.231-.616v.062a4.93 4.93 0 003.946 4.827 4.957 4.957 0 01-2.224.084 4.936 4.936 0 004.604 3.416A9.868 9.868 0 010 21.54a13.905 13.905 0 007.548 2.212c9.054 0 14.004-7.496 14.004-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0024 4.557z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.75 2H4.25C3.007 2 2 3.007 2 4.25v15.5C2 20.993 3.007 22 4.25 22h15.5c1.243 0 2.25-1.007 2.25-2.25V4.25C22 3.007 20.993 2 19.75 2zM8.958 19.192H5.802V9.608h3.156v9.584zm-1.58-10.933c-.99 0-1.792-.803-1.792-1.792s.803-1.792 1.792-1.792 1.792.803 1.792 1.792-.802 1.792-1.792 1.792zm12.185 10.933h-3.157v-5.156c0-1.228-.018-2.804-1.711-2.804-1.71 0-1.972 1.338-1.972 2.718v5.241H9.566V9.608h3.03v1.312h.041c.421-.797 1.447-1.64 2.978-1.64 3.181 0 3.772 2.095 3.772 4.817v5.095z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.004 2C6.486 2 2 6.486 2 12.004c0 4.991 3.656 9.128 8.438 9.89v-6.997h-2.54V12h2.54v-1.597c0-2.507 1.492-3.893 3.775-3.893 1.094 0 2.237.195 2.237.195v2.459h-1.259c-1.243 0-1.629.773-1.629 1.562V12h2.772l-.443 2.897h-2.33v6.997c4.782-.762 8.438-4.899 8.438-9.89C22.007 6.486 17.522 2 12.004 2z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
