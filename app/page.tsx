import Header from "@/components/header/Header";
import MainView from "@/components/MainView";
import { connectDB } from "@/db/mongo";
import { Event } from "@/db/models/Events";

import { CalendarEventType } from "@/lib/store";
import dayjs from "dayjs";

const getEventsData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch all events from MongoDB
    const data = await Event.find().lean();

    // Convert date to ISO string and map _id to id
    return data.map((event) => ({
      id: event._id.toString(),
      title: event.title,
      date: dayjs(event.date).toISOString(),
      description: event.description,
    }));
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return [];
  }
};

export default async function Home() {
  const dbEvents = await getEventsData();

  return (
    <div className="">
      <Header />
      <MainView eventsData={dbEvents as unknown as CalendarEventType[]} />
    </div>
  );
}
