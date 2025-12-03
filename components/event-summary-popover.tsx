'use client'

import React, { useRef, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IoCloseSharp } from "react-icons/io5"
import { CalendarEventType } from '@/lib/store'
import { updateEvent, deleteEvent } from '@/app/actions/event-actions'

interface EventSummaryPopoverProps {
  isOpen: boolean
  onClose: () => void
  event: CalendarEventType
}

export function EventSummaryPopover({ isOpen, onClose, event }: EventSummaryPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleDelete = async () => {
    if (!confirm('Delete this event?')) return
    
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', event.id)
      await deleteEvent(formData)
      onClose()
    } catch (error) {
      console.error('Delete failed:', error)
      alert('Failed to delete event')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateSubmit = async (formData: FormData) => {
    setIsLoading(true)
    try {
      formData.append('id', event.id)
      await updateEvent(formData)
      setIsEditing(false)
      onClose()
    } catch (error) {
      console.error('Update failed:', error)
      alert('Failed to update event')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        ref={popoverRef}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Event Summary</h2>
          <Button variant="ghost" size="icon" onClick={onClose} disabled={isLoading}>
            <IoCloseSharp className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-4">
          {!isEditing ? (
            <>
              <p><strong>Title:</strong> {event.title}</p>
              <p><strong>Date:</strong> {dayjs(event.date).format("dddd, MMMM D, YYYY h:mm A")}</p>
              <p><strong>Description:</strong> {event.description || 'No description'}</p>
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsEditing(true)} 
                  className="flex-1"
                  disabled={isLoading}
                >
                  Edit
                </Button>
                <Button
                  onClick={handleDelete}
                  variant="destructive"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </>
          ) : (
            <form 
              action={handleUpdateSubmit} 
              className="space-y-3"
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.currentTarget)
                handleUpdateSubmit(formData)
              }}
            >
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input name="title" defaultValue={event.title} required disabled={isLoading} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    name="date"
                    defaultValue={dayjs(event.date).format('YYYY-MM-DD')}
                    className="w-full rounded border px-2 py-1"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <input
                    type="time"
                    name="time"
                    defaultValue={dayjs(event.date).format('HH:mm')}
                    className="w-full rounded border px-2 py-1"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Input name="description" defaultValue={event.description} disabled={isLoading} />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
