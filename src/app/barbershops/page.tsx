import BarberShopItem from "../_components/barbershop-item"
import { db } from "../_lib/prisma"

interface BarberShopsPageProps {
  searchParams: {
    search?: string
  }
}

const BarbersShopsPage = async ({ searchParams }: BarberShopsPageProps) => {
  const barberShops = await db.barberShop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
  })

  return (
    <div>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        {" "}
        Resultados para &quot;{searchParams.search}&quot;{" "}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {barberShops.map((barbershop) => (
          <BarberShopItem key={barbershop.id} barberShop={barbershop} />
        ))}
      </div>
    </div>
  )
}

export default BarbersShopsPage
