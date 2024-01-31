"use client";

import { User } from "@prisma/client";

import { UserItem, UserItemSkeleton } from "./user-item";
import { useSidebar } from "@/store/usesidebar";
import { Radio } from "lucide-react";

interface RecommendedProps {
  data: (User & {
    stream: { isLive: boolean } | null;
  })[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      {collapsed && (
        <div className="flex justify-center pb-1 text-rose-500">
          <Radio size="20px" />
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data?.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
