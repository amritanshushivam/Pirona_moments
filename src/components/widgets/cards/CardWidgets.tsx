import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Phone, Edit2, Trash2 } from 'lucide-react';

interface CardProps {
  title: string;
  subtitle?: string;
  gradient?: string;
  image?: string;
  rating?: number;
  price?: string;
  contact?: string;
  location?: string;
  status?: string;
  statusColor?: string;
  onEdit?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
}

export function Card({
  title,
  subtitle,
  gradient = 'from-amber-400 to-orange-600',
  image,
  rating,
  price,
  contact,
  location,
  status,
  statusColor = 'bg-green-600',
  onEdit,
  onDelete,
  children,
}: CardProps) {
  return (
    <motion.div
      className="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all bg-white border border-gray-100"
      whileHover={{ y: -8 }}
    >
      {image && (
        <div className={`relative h-40 bg-gradient-to-br ${gradient} overflow-hidden`}>
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-1">{title}</h3>
        {subtitle && <p className="text-xs text-gray-600 mb-3">{subtitle}</p>}

        {rating && (
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
            ))}
            <span className="text-xs font-bold text-gray-700 ml-1">{rating}</span>
          </div>
        )}

        <div className="space-y-2 mb-4 pb-4 border-b border-gray-100">
          {price && <p className="text-2xl font-bold text-amber-700">{price}</p>}
          {contact && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <Phone className="h-3 w-3 text-amber-600" />
              {contact}
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <MapPin className="h-3 w-3 text-amber-600" />
              {location}
            </div>
          )}
        </div>

        {status && (
          <div className={`${statusColor} text-white px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block`}>{status}</div>
        )}

        {children}

        {(onEdit || onDelete) && (
          <div className="flex gap-2 mt-4">
            {onEdit && (
              <Button
                size="sm"
                onClick={onEdit}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer rounded flex items-center justify-center gap-1"
              >
                <Edit2 className="h-3 w-3" /> Edit
              </Button>
            )}
            {onDelete && (
              <Button
                size="sm"
                onClick={onDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer rounded flex items-center justify-center gap-1"
              >
                <Trash2 className="h-3 w-3" /> Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

interface CardGridProps {
  children: React.ReactNode;
  columns?: number;
}

export function CardGrid({ children, columns = 3 }: CardGridProps) {
  const gridClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns] || 'md:grid-cols-3';

  return (
    <div className={`grid grid-cols-1 ${gridClass} gap-6`}>
      {children}
    </div>
  );
}
