"use client";
import { Spinner } from "@nextui-org/react";
import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center h-screen fixed inset-0">
      <Spinner />
    </div>
  );
}

export default Loading;
