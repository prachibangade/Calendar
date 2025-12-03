'use server'

import { connectDB } from "@/db/mongo";
import { Event } from "@/db/models/Events";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const date = formData.get('date') as string;
  const time = formData.get('time') as string;

  if (!title || !description || !date || !time) {
    return { error: 'All fields are required' };
  }

  const dateTime = new Date(`${date}T${time}:00`);

  try {
    await connectDB();

    await Event.create({
      title,
      description,
      date: dateTime,
      time,
    });

    revalidatePath("/");

    return { success: true };

  } catch (error) {
    console.error("Error creating event:", error);
    return { error: "Failed to create event" };
  }
}

export async function updateEvent(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const date = formData.get('date') as string;
  const time = formData.get('time') as string;
  const description = formData.get('description') as string;

  console.log('Update Event:', { id, title, date, time, description });

  if (!id || !title || !date || !time) {
    return { error: 'Missing required fields' };
  }

  try {
    await connectDB();
    const dateTime = new Date(`${date}T${time}:00`);
    
    const result = await Event.findByIdAndUpdate(id, {
      title,
      description,
      date: dateTime,
      time,
    }, { new: true });

    console.log('Update result:', result);

    if (!result) {
      return { error: 'Event not found' };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error('Error updating event:', error);
    return { error: `Failed to update event: ${error}` };
  }
}

export async function deleteEvent(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const id = formData.get('id') as string;

  console.log('Delete Event:', { id });

  if (!id) {
    return { error: 'Missing event id' };
  }

  try {
    await connectDB();

    const result = await Event.findByIdAndDelete(id);

    console.log('Delete result:', result);

    if (!result) {
      return { error: 'Event not found' };
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error('Error deleting event:', error);
    return { error: `Failed to delete event: ${error}` };
  }
}
