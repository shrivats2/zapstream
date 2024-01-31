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
import { insertPanelForUser } from "@/actions/panel";
import { v4 } from "uuid";

interface PanelFormProps {
  setopenAddPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PanelForm = ({ setopenAddPanel }: PanelFormProps) => {
  const form = useForm({
    defaultValues: {
      title: "",
      panel_img: "",
      panel_url: "",
      description: "",
    },
  });

  const [panelIMG, setPanelIMG] = useState("");
  const [isPending, startTransition] = useTransition();

  function onSubmit(data: any) {
    data.panel_img = panelIMG;
    console.log(data);

    startTransition(() => {
      insertPanelForUser(data)
        .then(() => {
          toast.success("Panel Added");
        })
        .catch(() => toast.error("Something went wrong"));
    });
  }

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
                <Input placeholder="Panel Title" {...field} />
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
                  {panelIMG == "" ? (
                    <div className="h-full w-8 border border-dashed border-white/30 bg-secondary-light"></div>
                  ) : (
                    <img
                      src={panelIMG}
                      alt="panel img"
                      className="w-auto h-auto"
                    />
                  )}
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
                <Input
                  disabled={panelIMG == "" ? true : false}
                  type="text"
                  {...field}
                />
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
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            type="reset"
            onClick={() => setopenAddPanel(false)}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            disabled={panelIMG == "" || isPending ? true : false}
            className="bg-rose-500 text-black hover:bg-rose-600"
            type="submit"
          >
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};
