import { createClient } from "@/shared/utils/supabase/client";

export const uploadPdfFile = async (fileName: string, file: File) => {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from("pdf-files")
    .upload(fileName, file);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
