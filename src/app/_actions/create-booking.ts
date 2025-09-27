"use server"

import { db } from "../_lib/prisma"

interface CreateBookingParams {
  barberShopServiceId: string
  userId: string
  date: Date
}

export const createBooking = async (bookingParams: CreateBookingParams) => {
  await db.booking.create({
    data: bookingParams,
  })
}
