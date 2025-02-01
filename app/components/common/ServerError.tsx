"use client";
import React from "react";
const ServerError = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-84px)] w-full py-20 px-4">
      <div className="p-10 rounded-lg drop-shadow-2xl flex items-center justify-center flex-col bg-white">
        <h1 className="text-5xl font-bold text-red-500">Oops!</h1>
        <p className="mt-2 text-lg text-blue-900 font-medium">
          Something went wrong. Please try again.
        </p>
        <button
          onClick={handleRefresh}
          className="flex justify-center rounded-md bg-red-600 px-5 py-1.5 mt-6 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default ServerError;
