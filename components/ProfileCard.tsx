"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Pencil, PersonStanding } from "lucide-react";
import { Tables } from "@/lib/database.types";
import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  userProfile: Tables<"profiles"> | null;
  userEmail?: string;
}

export default function ProfileCard({
  userProfile,
  userEmail,
}: ProfileCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-w-96 max-w-md bg-white dark:bg-gray-950 rounded-2xl overflow-hidden shadow-lg"
    >
      <CardHeader className="bg-gray-100 dark:bg-gray-800 px-6 py-8 flex flex-col items-center">
        <img
          src={
            userProfile?.avatar_url ||
            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
          }
          alt="Avatar"
          className="w-20 h-20 rounded-full"
        />
        <div className="text-center">
          <div className="text-xl font-semibold">{userProfile?.full_name}</div>
          <Badge variant="outline" className="mb-2">
            {userProfile?.role}
          </Badge>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            @{userProfile?.username}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-8 space-y-4">
        <div className="flex items-center gap-3">
          <MailIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <div className="text-gray-500 dark:text-gray-400">{userEmail}</div>
        </div>
        <div className="flex items-start gap-3">
          <PersonStanding className="w-8 h-8 text-gray-500 dark:text-gray-400" />
          <div className="text-gray-500 dark:text-gray-400">
            {userProfile?.bio ||
              "Add a bio (Hover over the card to see the edit profile icon)"}
          </div>
        </div>

        {isHovered && (
          <Link
            href="/profile/edit"
            className="absolute right-6 top-2 bg-gray-200 rounded-full p-2"
          >
            <Pencil className="w-5 h-5 text-gray-500" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
