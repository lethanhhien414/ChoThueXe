export default function VehicleItem({ vehicle }) {
  return (
    <div className="vehicle-card">
      
      <img src={vehicle.picture?.[0]} alt={vehicle.name} />

      <h3>{vehicle.name}</h3>

      <p>{vehicle.brand} • {vehicle.color}</p>

      <p>{vehicle.kind}</p>

      <p style={{color:"#2563eb",fontWeight:"bold"}}>
        {vehicle.price?.toLocaleString()} đ
      </p>

    </div>
  );
}