import { Link } from "react-router-dom";

export default function VehicleItem({ vehicle, layout = "row" }) {

  const image = vehicle.picture?.[0];

  if (layout === "card") {
    return (
      <div className="border rounded-xl p-4 shadow hover:shadow-lg transition">
        <img
          src={image}
          alt={vehicle.name}
          className="h-40 w-full object-cover rounded-lg mb-3"
        />

        <h3 className="font-semibold text-lg">{vehicle.name}</h3>
        <p className="text-sm text-gray-500">{vehicle.kind}</p>

        <p className="text-yellow-500 font-bold mt-2">
          {vehicle.price.toLocaleString()}đ / ngày
        </p>

        <Link
          to={`/vehicles/${vehicle.id}`}
          className="block mt-3 text-center bg-yellow-400 py-2 rounded-lg font-semibold"
        >
          Xem chi tiết
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6 bg-white rounded-xl p-4 shadow">
      <img
        src={image}
        alt={vehicle.name}
        className="w-32 h-24 object-contain"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-lg">{vehicle.name}</h3>
        <p className="text-sm text-gray-500">{vehicle.kind}</p>

        <p className="text-yellow-500 font-bold">
          {vehicle.price.toLocaleString()}đ / ngày
        </p>
      </div>

      <Link
        to={`/vehicles/${vehicle.id}`}
        className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold"
      >
        Xem chi tiết
      </Link>
    </div>
  );
}