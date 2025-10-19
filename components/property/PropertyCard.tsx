// components/property/PropertyCard.tsx
interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    image: string;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{property.title}</h2>
        <p className="text-gray-500">{property.location}</p>
        <p className="mt-2 font-bold">${property.price}/night</p>
      </div>
    </div>
  );
}
