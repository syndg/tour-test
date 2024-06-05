"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { UploadData, uploadSchema } from "@/lib/schemas/uploadAvatarSchema";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { uploadAvatar } from "@/actions/client/uploadAvatar";

const UploadAvatarForm = () => {
  const [isPending, startTransition] = useTransition();
  const [uploaded, setUploaded] = useState(false);

  const form = useForm<UploadData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      avatar: undefined,
    },
  });

  const onSubmit = (values: UploadData) => {
    startTransition(() => {
      (async () => {
        const res = await uploadAvatar(values);

        console.log(res);
        if (res?.status === "error") {
          toast.error("Something went wrong");
        }

        setUploaded(true);
        toast.success("Avatar uploaded successfully");
      })();
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start gap-3"
      >
        <FormField
          control={form.control}
          name="avatar"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files && event.target.files[0];
                    onChange(file);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="active:scale-[.98] transition-all duration-150]"
        >
          {isPending ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <>{uploaded ? "Uploaded" : "Upload"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UploadAvatarForm;
