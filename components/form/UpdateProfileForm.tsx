"use client";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/form/ui/CustomInput";
import { useForm } from "react-hook-form";

import {
  updateProfileSchema,
  UpdateProfileData,
} from "@/lib/schemas/updateProfileSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";

import { useRouter } from "next/navigation";
import UploadAvatarForm from "@/components/form/UploadAvatarForm";
import { Tables } from "@/lib/database.types";
import { updateProfile } from "@/actions/updateProfile";
import CustomRadio from "./ui/CustomRadio";

interface UpdateProfileDataFormProps {
  initialValues: Tables<"profiles"> | null;
}

const UpdateProfileDataForm = ({
  initialValues,
}: UpdateProfileDataFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const defValues = {
    ...initialValues,
    full_name: initialValues?.full_name as string,
    username: initialValues?.username as string,
    bio: initialValues?.bio as string,
    role: initialValues?.role as string,
  };

  const form = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: defValues || {
      full_name: "",
      username: "",
      bio: "",
      role: "",
    },
  });

  const onSubmit = (values: UpdateProfileData) => {
    startTransition(() => {
      (async () => {
        const result = await updateProfile(values);

        if (result.status === "error") {
          toast.error(result.message);
          return;
        }

        toast.success("Profile updated successfully");
        router.refresh();
        router.push("/profile");
        form.reset();
      })();
    });
  };

  return (
    <Form {...form}>
      <UploadAvatarForm />
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <CustomInput
          label="Full Name"
          name="full_name"
          control={form.control}
          placeholderText="Harry Potter"
        />
        <CustomInput
          label="Username"
          name="username"
          control={form.control}
          placeholderText="harry_potter"
        />
        <CustomInput
          label="Bio"
          name="bio"
          control={form.control}
          placeholderText="Add you bio"
        />
        <CustomRadio
          label="Role"
          name="role"
          control={form.control}
          options={[
            { type: "Manager", label: "Manager" },
            { type: "Employee", label: "Employee" },
          ]}
        />

        <Button
          type="submit"
          className="w-full active:scale-[.98] transition-all duration-150]"
        >
          {isPending ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <>Update Profile</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateProfileDataForm;
