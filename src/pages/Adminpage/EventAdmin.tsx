import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "../../supabaseClient";
import { fetchTableData, uploadImage, deleteRecord } from "../Adminpage/adminHelpers";

interface Event {
  id: number;
  heading: string;
  description: string;
  image_url: string;
}

const EventsAdmin = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<number>>(new Set());

  const [form, setForm] = useState({
    heading: "",
    description: "",
    image_url: "" as string | File,
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await fetchTableData("events");
      setEvents(data);
    } catch (err: any) {
      console.error(err);
      setMessage("Error fetching events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e: any) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files?.[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const openModal = (event: Event | null = null) => {
    if (event) {
      setEditEvent(event);
      setForm({
        heading: event.heading,
        description: event.description,
        image_url: event.image_url,
      });
    } else {
      setEditEvent(null);
      setForm({
        heading: "",
        description: "",
        image_url: "",
      });
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditEvent(null);
    setForm({
      heading: "",
      description: "",
      image_url: "",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      let payload: any = {
        heading: form.heading,
        description: form.description,
      };

      // Upload image if a file was selected
      if (form.image_url instanceof File) {
        const uploadedUrl = await uploadImage(form.image_url, "events");
        payload.image_url = uploadedUrl;
      } else if (typeof form.image_url === "string") {
        payload.image_url = form.image_url;
      }

      if (editEvent) {
        const { error } = await supabase
          .from("events")
          .update(payload)
          .eq("id", editEvent.id);

        if (error) throw error;
        setMessage("Event updated successfully");
      } else {
        const { error } = await supabase.from("events").insert([payload]);
        if (error) throw error;
        setMessage("Event created successfully");
      }

      fetchEvents();
      closeModal();
    } catch (err: any) {
      console.error(err);
      setMessage("Error saving event");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete event?")) return;

    try {
      await deleteRecord("events", id);
      setMessage("Event deleted successfully");
      fetchEvents();
    } catch (err: any) {
      console.error(err);
      setMessage("Error deleting event");
    }
  };

  const toggleDescription = (id: number) => {
    setExpandedDescriptions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getTruncatedText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const isLongDescription = (text: string, maxLength: number = 100) => {
    return text.length > maxLength;
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Events Management</h1>
        <Button className="bg-green-600" onClick={() => openModal()}>
          Add Event
        </Button>
      </div>

      {message && (
        <div className="p-3 mb-4 rounded bg-gray-700">{message}</div>
      )}

      <div className="bg-gray-800 rounded-lg overflow-x-auto p-4">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="p-3 border-b border-gray-700">Image</th>
              <th className="p-3 border-b border-gray-700">Heading</th>
              <th className="p-3 border-b border-gray-700">Description</th>
              <th className="p-3 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length ? (
              events.map((ev) => {
                const isExpanded = expandedDescriptions.has(ev.id);
                const shouldShowReadMore = isLongDescription(ev.description);

                return (
                  <tr key={ev.id} className="hover:bg-gray-700">
                    <td className="p-3">
                      <img
                        src={
                          ev.image_url ||
                          "https://via.placeholder.com/60"
                        }
                        className="w-14 h-14 object-cover rounded"
                        alt={ev.heading}
                      />
                    </td>
                    <td className="p-3 font-medium">{ev.heading}</td>
                    <td className="p-3 max-w-md">
                      <div className="text-left">
                        <div className="whitespace-pre-line">
                          {isExpanded ? (
                            <div>
                              {ev.description}
                              {shouldShowReadMore && (
                                <button
                                  onClick={() => toggleDescription(ev.id)}
                                  className="text-blue-400 hover:text-blue-300 ml-2 text-sm font-medium"
                                >
                                  Read Less
                                </button>
                              )}
                            </div>
                          ) : (
                            <div>
                              {shouldShowReadMore ? (
                                <>
                                  {getTruncatedText(ev.description)}
                                  <button
                                    onClick={() => toggleDescription(ev.id)}
                                    className="text-blue-400 hover:text-blue-300 ml-2 text-sm font-medium"
                                  >
                                    Read More
                                  </button>
                                </>
                              ) : (
                                ev.description
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <Button
                          className="bg-blue-600"
                          onClick={() => openModal(ev)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-red-600"
                          onClick={() => handleDelete(ev.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-gray-400">
                  {loading ? "Loading..." : "No events found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">
              {editEvent ? "Edit Event" : "Add Event"}
            </h2>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <input
                name="heading"
                value={form.heading}
                placeholder="Event Heading"
                onChange={handleChange}
                className="w-full p-2 rounded text-black"
                required
              />

              <textarea
                name="description"
                value={form.description}
                placeholder="Event Description"
                onChange={handleChange}
                className="w-full p-2 rounded text-black min-h-[100px]"
              />

              {typeof form.image_url === "string" &&
                form.image_url.trim() !== "" && (
                  <img
                    src={form.image_url}
                    className="w-20 h-20 rounded object-cover"
                    alt="Preview"
                  />
                )}

              <input
                name="image_url"
                type="file"
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black"
              />

              <div className="flex justify-end gap-2 mt-4">
                <Button className="bg-gray-600" onClick={closeModal}>
                  Cancel
                </Button>
                <Button className="bg-blue-600" type="submit">
                  {loading ? "Saving..." : "Save"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsAdmin;