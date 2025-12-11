// utils/adminHelpers.ts
import { supabase } from "../../supabaseClient";

export const fetchTableData = async (table: string) => {
  try {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("id", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error(`Error fetching ${table}:`, err);
    return [];
  }
};

export const uploadImage = async (file: File, folder: string) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("project-images")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (err) {
    console.error("Upload error:", err);
    throw err;
  }
};

export const deleteRecord = async (table: string, id: number) => {
  try {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (err) {
    console.error(`Delete error for ${table}:`, err);
    throw err;
  }
};