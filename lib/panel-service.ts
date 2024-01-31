import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export const getPanels = async (id: string) => {
  const self = await getSelf();
  const userId = self.id;
  const panels = await db.user.findUnique({
    where: { id: userId },
    select: {
      panel: true,
    },
  });

  return panels;
};
