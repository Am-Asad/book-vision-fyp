import { createClient } from "@/shared/utils/supabase/client";

export const getFilePublicUrl = (fileName: string) => {
  const supabase = createClient();
  return supabase.storage.from("pdf-files").getPublicUrl(fileName)?.data
    ?.publicUrl;
};
