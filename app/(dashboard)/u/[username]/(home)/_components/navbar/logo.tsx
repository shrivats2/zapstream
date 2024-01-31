import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className=" rounded-full p-0.5 mr-12 shrink-0 lg:mr-0 lg:shrink">
          <Image
            className="rounded-full"
            src="/logo.png"
            alt="Zapstream"
            height="42"
            width="42"
          />
        </div>
        <div className={cn("hidden lg:block", font.className)}>
          <p className="[text-shadow:_3px_3px_0_#ff0050] text-lg font-semibold">
            Zapstream
          </p>
          <p className="text-xs text-muted-foreground">Creator dashboard</p>
        </div>
      </div>
    </Link>
  );
};
