"use server";

import { Panel } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { v4 } from "uuid";

export const insertPanelForUser = async (values: Partial<Panel>) => {
  try {
    const self = await getSelf();
    const userId = self.id;

    const createdPanel = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        panel: {
          push: {
            p_id: v4() ?? "",
            title: values.title,
            panel_img: values.panel_img ?? "",
            panel_url: values.panel_url ?? "",
            description: values.description,
          },
        },
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return createdPanel;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};

export const removePanelForUser = async (p_id: string) => {
  try {
    const self = await getSelf();
    const userId = self.id;

    const createdPanel = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        panel: {
          deleteMany: {
            where: {
              p_id: p_id,
            },
          },
        },
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return createdPanel;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Error");
  }
};

export const updatePanelItem = async (
  p_id: string,
  updatedData: Partial<Panel>
) => {
  try {
    const self = await getSelf();
    const userId = self.id;
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        panel: {
          updateMany: {
            where: { p_id: p_id },
            data: updatedData,
          },
        },
      },
    });

    revalidatePath(`/u/${self.username}/chat`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/${self.username}`);

    return updatedUser.panel;
  } catch (error) {
    throw new Error("Internal Error: " + error);
  }
};
