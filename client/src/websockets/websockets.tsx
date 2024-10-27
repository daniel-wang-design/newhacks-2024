import React, { useEffect, useState } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabase: SupabaseClient = createClient(
  "https://gldvgrcsiwscznrzcgxe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdsZHZncmNzaXdzY3pucnpjZ3hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NzYzMTQsImV4cCI6MjA0NTU1MjMxNH0.YAhY2yXpVLxRFErP2XS-4FhRGfFZ2BSgdSXuLdQql3U"
);

// Define the type for your table's data
interface YourTableName {
  id: number;
  created_at: string;
  status: boolean;
}

const RealTimeComponent: React.FC = () => {
  const [data, setData] = useState<YourTableName[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: result, error } = await supabase
          .from("callstatus")
          .select();

        if (error) {
          console.error("Error fetching data:", error);
        } else {
          setData(result);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 1000); // Fetch every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div>
      <h1>Supabase Data</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default RealTimeComponent;
