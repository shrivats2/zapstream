import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { PanelModal } from "./panel-modal";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  insertPanelForUser,
  removePanelForUser,
  updatePanelItem,
} from "@/actions/panel";
import { v4 } from "uuid";
import { title } from "process";

interface PanelEditFormProps {
  title: string;
  panel_img: string;
  panel_url: string;
  description: string;
  p_id: string;
}

export const PanelEditForm = ({
  title,
  panel_img,
  panel_url,
  description,
  p_id,
}: PanelEditFormProps) => {
  const form = useForm({
    defaultValues: {
      title,
      panel_img,
      panel_url,
      description,
    },
  });

  const [panelIMG, setPanelIMG] = useState(panel_img);
  const [isPending, startTransition] = useTransition();
  const isFormDirty = form.formState.isDirty;

  function onSubmit(data: any) {
    data.panel_img = panelIMG;
    data.p_id = p_id;
    startTransition(() => {
      updatePanelItem(p_id, data)
        .then(() => {
          toast.success("Panel Updated");
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

  const removePanel = async () => {
    startTransition(() => {
      removePanelForUser(p_id)
        .then(() => {
          toast.success("Panel Removed");
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Panel Title</FormLabel>
              <FormControl>
                <Input placeholder="Panel Title" {...field} value={title} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="panel_img"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative h-10 flex justify-between">
                  <PanelModal setPanelIMG={setPanelIMG} />
                  <img
                    src={panelIMG}
                    alt="panel img"
                    className="w-auto h-auto"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="panel_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Links To</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="resize-none"
                  {...field}
                >
                  {description}
                </Textarea>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Button
            className="hover:bg-rose-900"
            disabled={isPending}
            variant="outline"
            size="sm"
            type="reset"
            onClick={removePanel}
          >
            Remove
          </Button>
          <Button
            size="sm"
            disabled={!isFormDirty || panelIMG === "" || isPending}
            className="bg-rose-500 text-black hover:bg-rose-600"
            type="submit"
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
};
