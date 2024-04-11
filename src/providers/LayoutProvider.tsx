"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isPublicPage = ["/sign-in", "/sign-up"].includes(pathname);
  return (
    <div className="md:px-20 px-3">
      {!isPublicPage && (
        <div className="flex justify-between items-center py-5 px-5 border shadow border-gray-300">
          <h1
            className="text-primary font-semibold cursor-pointer"
            onClick={() => router.push("/")}
          >
            Dev <b className="text-">Quora</b>
          </h1>
          <div className="px-5 flex gap-5 items-center">
            <Button size="sm" onClick={() => router.push("/profile")}>
              Profile
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      )}

      <div className="my-5">{children}</div>
    </div>
  );
}

export default LayoutProvider;
