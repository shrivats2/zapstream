import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const getSearch = async (term?: string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if (userId) {
    const streamsByName = await db.stream.findMany({
      where: {
        user: {
          NOT: {
            blocking: {
              some: {
                blockedId: userId,
              },
            },
          },
        },
        name: {
          contains: term,
        },
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });

    // const streamsByUser = await db.stream.findMany({
    //   where: {
    //     user: {
    //       NOT: {
    //         blocking: {
    //           some: {
    //             blockedId: userId,
    //           },
    //         },
    //       },
    //       username: {
    //         contains: term,
    //       },
    //     },
    //   },
    //   select: {
    //     user: true,
    //     id: true,
    //     name: true,
    //     isLive: true,
    //     thumbnailUrl: true,
    //     updatedAt: true,
    //   },
    //   orderBy: [
    //     {
    //       isLive: "desc",
    //     },
    //     {
    //       updatedAt: "desc",
    //     },
    //   ],
    // });

    streams = [...streamsByName];
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            user: {
              username: {
                contains: term,
              },
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        name: true,
        isLive: true,
        thumbnailUrl: true,
        updatedAt: true,
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
    });
  }

  return streams;
};
