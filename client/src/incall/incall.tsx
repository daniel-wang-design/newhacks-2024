import React, { useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import "./incall.css";

const supabase: SupabaseClient = createClient(
  "https://gldvgrcsiwscznrzcgxe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsZHZncmNzaXdzY3pucnpjZ3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NzYzMTQsImV4cCI6MjA0NTU1MjMxNH0.YAhY2yXpVLxRFErP2XS-4FhRGfFZ2BSgdSXuLdQql3U"
);

function Incall() {
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = async () => {
    // Toggle the mute state
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);

    // Update Supabase
    try {
      const { error } = await supabase
        .from("callstatus") // Replace with your actual table name
        .upsert([{ id: 2, status: newMuteState }]); // Assuming you have an id column
      if (error) throw error;
    } catch (error) {
      console.error("Error updating mute status:", error);
    }
  };

  return (
    <div className="incall">
      <h1>{isMuted ? "Muted" : "Unmuted"}</h1>
      <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>
    </div>
  );
}
export default Incall;
