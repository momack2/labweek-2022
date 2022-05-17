import Link from "next/link";
import { useState } from 'react'
import { Modal, Button } from 'flowbite-react'

import dayjs from 'dayjs'

export function Card({ children }) {
  return (
    <div className={`eventcard p-0.5 shadow-md h-full whitespace-normal
      bg-gray-400 hover:bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500
      `}>
      <div className="block p-3 bg-white sm:px-3 sm:py-2 h-full
        hover:bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-green-500/10
        ">
        <div className="text-xs text-gray-600">
          { children }
        </div>
      </div>
    </div>
  )
}

// hover:ml-1 hover:-mr-1 hover:mt-1 hover:-mb-1
export function EventCard({ event }) {
  return (
    <EventModal event={event}>
      <Card>
        <h5 className="text-lg font-bold text-gray-900">
          {event.name}
        </h5>
        <div>
          {event.times}
        </div>
        <div>
          👤 {event.attendees} - {event.difficulty}
        </div>
        <div className="text-gray-900 text-sm mt-3">
          {event.org}
        </div>

        <div className="event-tags">
          {event.tags.map((tag, i) => (
            <Tag>{tag}</Tag>
          ))}
        </div>
      </Card>
    </EventModal>
  )
}

export function BlankCard() {
  return (
    <AddEventModal>
      <Card>
        <div className="place-content-center my-5 text-center text-gray-300 hover:text-gray-500">
          <div className="text-6xl">
            +
          </div>
          <div className="text-xl font-bold">
            Add your event
          </div>
        </div>
      </Card>
    </AddEventModal>
  )
}

export function EventModal({ children, event }) {
  const [openModal, setOpenModal] = useState(false);
  const open = () => setOpenModal(true)
  const close = () => setOpenModal(false)
  const isOpen = () => openModal === true


  return (
    <>
      <div className="h-full w-full" onClick={open}>
        {children}
      </div>
      <Modal show={isOpen()} onClose={close}>
        <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 p-1">
          <div className="bg-white dark:bg-gray-400">
            <Modal.Header>
              {event.name}
            </Modal.Header>
            <Modal.Body className="space-y-6">
              <ul className="list-disc ml-4">
                <li><b>Date</b>: {dateStr(event.date, event.days)}</li>
                <li><b>Times</b>: {event.times}</li>
                <li><b>Organizers</b>: {event.org}</li>
                <li><b>Attendees</b>: {event.attendees} ({event.difficulty})</li>
              </ul>
              <div className="event-tags">
                {event.tags.map((tag, i) => (
                  <Tag>{tag}</Tag>
                ))}
              </div>
              <p className="text-base leading-relaxed">
                {event.description}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Link href={event.website} prefetch={false} target="_blank">
                <a target="_blank" rel="noreferrer">
                  <Button>
                    Website
                  </Button>
                </a>
              </Link>
              <Button
                color="alternative"
                onClick={close}
              >
                Close
              </Button>
            </Modal.Footer>
          </div>
        </div>
      </Modal>
    </>
  )
}

export function AddEventModal({ children }) {
  const [openModal, setOpenModal] = useState(false);
  const open = () => setOpenModal(true)
  const close = () => setOpenModal(false)
  const isOpen = () => openModal === true

  return (
    <>
      <div className="h-full w-full" onClick={open}>
        {children}
      </div>
      <Modal show={isOpen()} onClose={close}>
        <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-green-500 p-1">
          <div className="bg-white dark:bg-gray-400">
            <Modal.Header>
              Add your event
            </Modal.Header>
            <Modal.Body className="space-y-6">
              The event listings in this website are coordinated through GitHub.

              Steps to list your event:
              <ol className="list-decimal ml-4 mt-3">
                <li><b>Step 1</b>: Please read this document: [link]</li>
                <li><b>Step 2</b>: File a pull-request here: [link]</li>
                <li><b>Step 3</b>: Address any comments until your PR is merged.</li>
                <li><b>Step 4</b>: Profit! ⭐️💙</li>
              </ol>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={close}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        </div>
      </Modal>
    </>
  )
}

export function Tag({ children }) {
  return (
    <button className="px-1.5 py-0.5 mr-1 my-1 border border-gray-400 text-gray-400 rounded-full text-xs cursor-default">
      {children}
    </button>
  )
}

function dateStr(date, days) {
  const d1 = dayjs(date)
  const d2 = dayjs(date).add(days, 'day')
  return d1.format("MMM DD") +' - '+ d2.format("MMM DD")
}

export default EventCard