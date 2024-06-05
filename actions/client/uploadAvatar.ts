import { UploadData } from "@/lib/schemas/uploadAvatarSchema";
import { createSupabaseBrowserClient } from "@/utils/supabase/supabaseBrowserClient";

export const uploadAvatar = async (values: UploadData) => {
  const supabase = createSupabaseBrowserClient();

  const { data: userResponse } = await supabase.auth.getUser();

  if (!userResponse?.user) {
    return;
  }

  const { data: pathData, error } = await supabase.storage
    .from("avatars")
    .upload(`${userResponse?.user?.id}_profile_avatar`, values.avatar, {
      upsert: true,
    });

  if (error) {
    return { status: "error", message: error.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(pathData?.path!);

  const { data } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrl })
    .eq("id", userResponse?.user?.id);

  return { status: "success" };
};
