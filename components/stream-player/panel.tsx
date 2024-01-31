import { LayoutPanelTop, Plus } from "lucide-react";
import React, { useState } from "react";
import { PanelForm } from "./panel-form";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { PanelEditForm } from "./panel-edit-form";

interface PanelProps {
  panel: {
    description: string;
    p_id: string;
    panel_img: string;
    panel_url: string;
    title: string;
  }[];
  hostIdentity: string;
  viewerIdentity: string;
}

export const Panel = ({ panel, hostIdentity, viewerIdentity }: PanelProps) => {
  const [openAddPanel, setopenAddPanel] = useState(false);
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;
  const { collapsed } = useChatSidebar((state) => state);
  const [preview, setPreview] = useState(!isHost);

  return (
    <div className="px-4">
      {isHost && (
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-rose-600 p-2 h-auto w-auto">
            <LayoutPanelTop className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your Panels
            </h2>
          </div>
          <Switch
            id="airplane-mode"
            className="ml-auto"
            onCheckedChange={() => {
              setPreview(!preview);
            }}
            checked={preview}
          />
          <Label htmlFor="airplane-mode">Preview</Label>
        </div>
      )}
      <div
        className={cn(
          "grid gap-3 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-4",
          collapsed && "md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6"
        )}
      >
        {isHost ? (
          <>
            {preview === true ? (
              <>
                {panel.map((panels, key) => (
                  <div
                    key={panels.p_id}
                    className="relative flex w-full max-w-xs flex-col overflow-hidden"
                  >
                    {panels.title && (
                      <div className="break-words text-lg font-semibold leading-tight">
                        {panels.title}
                      </div>
                    )}
                    <div
                      className="relative h-0"
                      style={{ paddingBottom: "100%" }}
                    >
                      <Link
                        href={panels.panel_url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <img
                          src={panels.panel_img}
                          alt="Card Image"
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                      </Link>
                    </div>
                    {panels.description && (
                      <div className="whitespace-pre-wrap text-sm">
                        {panels.description}
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <>
                {panel.map((panels, key) => (
                  <div className="relative cursor-pointer bg-secondary p-3 transition-colors min-h-72 flex items-center justify-center">
                    <PanelEditForm
                      title={panels.title}
                      panel_img={panels.panel_img}
                      p_id={panels.p_id}
                      description={panels.description}
                      panel_url={panels.panel_url}
                    />
                  </div>
                ))}
                <div className="relative cursor-pointer bg-secondary p-3 transition-colors min-h-72 flex items-center justify-center">
                  {openAddPanel ? (
                    <PanelForm setopenAddPanel={setopenAddPanel} />
                  ) : (
                    <div className="mb-2 mt-4 text-xl">
                      <Plus
                        size="32px"
                        onClick={() => setopenAddPanel(!openAddPanel)}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {panel.map((panels, key) => (
              <div
                key={panels.p_id}
                className="relative flex w-full max-w-xs flex-col overflow-hidden"
              >
                {panels.title && (
                  <div className="break-words text-lg font-semibold leading-tight">
                    {panels.title}
                  </div>
                )}
                <div className="relative h-0" style={{ paddingBottom: "100%" }}>
                  <Link
                    href={panels.panel_url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <img
                      src={panels.panel_img}
                      alt="Card Image"
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  </Link>
                </div>
                {panels.description && (
                  <div className="whitespace-pre-wrap text-sm">
                    {panels.description}
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
