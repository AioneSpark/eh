import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
        return;
      }

      const formatted = data.map((item) => ({
        id: item.id,
        heading: item.heading,
        description: item.description,
        image: item.image_url,
        expanded: false, // 👈 Read More state for each item
      }));

      setEvents(formatted);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const toggleReadMore = (id) => {
    setEvents((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, expanded: !item.expanded } : item
      )
    );
  };

  if (loading) return <p className="text-center py-10">Loading Events...</p>;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition"
          >
            <img
              src={ev.image}
              alt={ev.heading}
              className="w-full h-56 object-cover rounded-xl mb-4"
            />

            <h2 className="text-xl font-bold mb-2">{ev.heading}</h2>

            {/* Description with clamp */}
            <p
              className={`text-gray-700 transition-all duration-300 ${
                ev.expanded
                  ? "line-clamp-none"
                  : "line-clamp-2" /* shows only 2 lines */
              }`}
            >
              {ev.description}
            </p>

            {/* Read more / less button */}
            <button
              onClick={() => toggleReadMore(ev.id)}
              className="mt-2 text-blue-600 font-semibold hover:underline"
            >
              {ev.expanded ? "Read Less" : "Read More"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsPage;
