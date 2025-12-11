// pages/DoctorsAdmin.tsx
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../../supabaseClient";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  education: string;
  phone: string;
  email: string;
  image: string;
}

const DoctorsAdmin = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editDoctor, setEditDoctor] = useState<Doctor | null>(null);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    education: "",
    phone: "",
    email: "",
    image: "" as string | File,
  });

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      console.log("Fetching doctors from Supabase...");
      
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Fetched doctors data:", data);
      
      if (data) {
        // Ensure proper typing
        const typedDoctors: Doctor[] = data.map(doc => ({
          id: doc.id,
          name: doc.name || "",
          specialization: doc.specialization || "",
          education: doc.education || "",
          phone: doc.phone || "",
          email: doc.email || "",
          image: doc.image || ""
        }));
        
        setDoctors(typedDoctors);
      } else {
        setDoctors([]);
      }
    } catch (err: any) {
      console.error("Error fetching doctors:", err);
      setMessage("Error fetching doctors: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, folder: string) => {
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

  const deleteRecord = async (table: string, id: number) => {
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

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files?.[0] || "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const openModal = (doctor: Doctor | null = null) => {
    if (doctor) {
      setEditDoctor(doctor);
      setForm({
        name: doctor.name || "",
        specialization: doctor.specialization || "",
        education: doctor.education || "",
        phone: doctor.phone || "",
        email: doctor.email || "",
        image: doctor.image || "",
      });
    } else {
      setEditDoctor(null);
      setForm({
        name: "",
        specialization: "",
        education: "",
        phone: "",
        email: "",
        image: "",
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditDoctor(null);
    setForm({
      name: "",
      specialization: "",
      education: "",
      phone: "",
      email: "",
      image: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log("Submitting form:", form);
      console.log("Editing doctor:", editDoctor);
      
      let payload: any = {
        name: form.name || "",
        specialization: form.specialization || "",
        education: form.education || "",
        phone: form.phone || "",
        email: form.email || "",
      };

      // Image handling
      if (form.image instanceof File) {
        console.log("Uploading new image...");
        const imageUrl = await uploadImage(form.image, "doctors");
        payload.image = imageUrl;
        console.log("Image uploaded to:", imageUrl);
      } else if (typeof form.image === 'string' && form.image.trim() !== '') {
        payload.image = form.image;
        console.log("Using existing image:", form.image);
      }

      console.log("Final payload:", payload);

      if (editDoctor) {
        // Update
        console.log("Updating doctor with ID:", editDoctor.id);
        const { error } = await supabase
          .from("doctors")
          .update(payload)
          .eq("id", editDoctor.id);

        if (error) {
          console.error("Update error details:", error);
          throw error;
        }
        setMessage("Doctor updated successfully");
      } else {
        // Insert
        console.log("Inserting new doctor");
        const { error } = await supabase
          .from("doctors")
          .insert([payload]);

        if (error) {
          console.error("Insert error details:", error);
          throw error;
        }
        setMessage("Doctor added successfully");
      }

      await fetchDoctors();
      closeModal();
    } catch (err: any) {
      console.error("Submit error:", err);
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    
    try {
      await deleteRecord("doctors", id);
      setMessage("Doctor deleted successfully");
      await fetchDoctors();
    } catch (err: any) {
      console.error("Delete error:", err);
      setMessage("Delete Error: " + err.message);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Doctors Management</h1>
        <Button 
          onClick={() => openModal()} 
          className="px-4 py-2 rounded bg-green-600 hover:bg-green-500"
        >
          Add Doctor
        </Button>
      </div>

      {message && (
        <div className={`p-3 mb-4 rounded ${message.includes("Error") ? "bg-red-900" : "bg-green-900"}`}>
          {message}
        </div>
      )}


      {/* Doctors Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg p-2">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="p-3 border-b border-gray-700">Image</th>
              <th className="p-3 border-b border-gray-700">Name</th>
              <th className="p-3 border-b border-gray-700">Specialization</th>
              <th className="p-3 border-b border-gray-700">Education</th>
              <th className="p-3 border-b border-gray-700">Phone</th>
              <th className="p-3 border-b border-gray-700">Email</th>
              <th className="p-3 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-700">
                  <td className="p-3 border-b border-gray-700">
                    <div className="flex justify-center">
                      <img
                        src={doctor.image || "https://via.placeholder.com/50"}
                        alt={doctor.name}
                        className="w-12 h-12 object-cover rounded-full"
                        onError={(e) => {
                        
                        }}
                      />
                    </div>
                  </td>
                  <td className="p-3 border-b border-gray-700 font-medium">{doctor.name}</td>
                  <td className="p-3 border-b border-gray-700">{doctor.specialization || "-"}</td>
                  <td className="p-3 border-b border-gray-700">{doctor.education || "-"}</td>
                  <td className="p-3 border-b border-gray-700">{doctor.phone || "-"}</td>
                  <td className="p-3 border-b border-gray-700">{doctor.email || "-"}</td>
                  <td className="p-3 border-b border-gray-700">
                    <div className="flex justify-center gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => openModal(doctor)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDelete(doctor.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-400">
                  {loading ? "Loading doctors..." : "No doctors found. Click 'Add Doctor' to create one."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     {/* Modal with Glass Effect */}
{modalOpen && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-auto p-4">
    <div className="relative w-full max-w-xl">
      {/* Glass Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"></div>
      
      {/* Content */}
      <div className="relative p-6">
        <h2 className="text-2xl font-bold mb-6 text-white">
          {editDoctor ? "Edit Doctor" : "Add Doctor"}
        </h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Glass Input Fields */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">Doctor Name *</label>
            <input
              name="name"
              placeholder="Doctor Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">Specialization</label>
              <input
                name="specialization"
                placeholder="Specialization"
                value={form.specialization}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-white/80">Education</label>
              <input
                name="education"
                placeholder="Education / Qualification"
                value={form.education}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/30"
              />
            </div>
          </div>
          
        
          
          {/* Image Upload with Glass Effect */}
          <div>
            <label className="block text-sm font-medium mb-2 text-white/80">Profile Image</label>
            
            {form.image && typeof form.image === 'string' && form.image.trim() !== '' ? (
              <div className="mb-3 p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={form.image} 
                      alt="Current" 
                      className="w-16 h-16 object-cover rounded-lg border-2 border-white/20"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">Current Image</p>
                      <p className="text-xs text-white/50">Click remove to change</p>
                    </div>
                  </div>
                  <Button 
                    type="button" 
                    onClick={() => setForm({...form, image: ''})}
                    className="px-3 py-1.5 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 rounded-lg backdrop-blur-sm"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : null}
            
            {/* Glass File Input */}
            <div className="relative">
              <input 
                type="file" 
                name="image" 
                onChange={handleChange} 
                accept="image/*"
                className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-500/30 file:text-blue-200 hover:file:bg-blue-500/40 file:backdrop-blur-sm"
              />
              <p className="text-xs text-white/50 mt-2">
                Recommended: Square image, 400×400 pixels or larger
              </p>
            </div>
          </div>

          {/* Glass Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-white/10">
            <Button 
              type="button" 
              onClick={closeModal}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg backdrop-blur-sm transition-all"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500/80 to-blue-600/80 hover:from-blue-600/80 hover:to-blue-700/80 text-white rounded-lg backdrop-blur-sm border border-blue-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : editDoctor ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}

      {loading && !modalOpen && (
        <div className="mt-4 p-4 text-center">
          <p className="text-gray-400">Loading doctors...</p>
        </div>
      )}
    </div>
  );
};

export default DoctorsAdmin;