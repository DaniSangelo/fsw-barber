"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface CreateBookingParams {
  barberShopServiceId: string
  userId: string
  date: Date
}

export const createBooking = async (bookingParams: CreateBookingParams) => {
  const data = await getServerSession(authOptions)

  if (!data) throw new Error("User not authenticated")

  await db.booking.create({
    data: {
      ...bookingParams,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userId: (data.user as any).id,
    },
  })
  revalidatePath("/barbershops/[id]")
}
