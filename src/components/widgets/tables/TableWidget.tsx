import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Edit2, Save, Trash2 } from 'lucide-react';

interface TableColumn {
  key: string;
  label: string;
  render?: (value: any) => React.ReactNode;
}

interface TableWidgetProps {
  columns: TableColumn[];
  data: any[];
  editingId?: string | number | null;
  editValues?: any;
  onEdit?: (id: string | number) => void;
  onSave?: () => void;
  onDelete?: (id: string | number) => void;
  onCancel?: () => void;
  onEditChange?: (field: string, value: any) => void;
}

export function TableWidget({
  columns,
  data,
  editingId,
  editValues,
  onEdit,
  onSave,
  onDelete,
  onCancel,
  onEditChange,
}: TableWidgetProps) {
  return (
    <motion.div
      className="overflow-x-auto backdrop-blur-sm bg-white/40 border border-white/40 rounded-2xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-white/60 border-b-2 border-gray-200">
            {columns.map((col) => (
              <th key={col.key} className="text-left p-4 font-bold text-gray-800">
                {col.label}
              </th>
            ))}
            <th className="text-left p-4 font-bold text-gray-800">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="border-b border-gray-100 hover:bg-white/30">
              {columns.map((col) => (
                <td key={col.key} className="p-4">
                  {editingId === row.id ? (
                    <input
                      type="text"
                      value={editValues?.[col.key] || ''}
                      onChange={(e) => onEditChange?.(col.key, e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded w-full text-sm"
                    />
                  ) : col.render ? (
                    col.render(row[col.key])
                  ) : (
                    <span>{row[col.key]}</span>
                  )}
                </td>
              ))}
              <td className="p-4 flex gap-2">
                {editingId === row.id ? (
                  <>
                    <Button
                      size="sm"
                      onClick={onSave}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs px-2 cursor-pointer rounded flex items-center gap-1"
                    >
                      <Save className="h-3 w-3" /> Save
                    </Button>
                    <Button
                      size="sm"
                      onClick={onCancel}
                      className="bg-gray-400 hover:bg-gray-500 text-white text-xs px-2 cursor-pointer rounded"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    {onEdit && (
                      <Button
                        size="sm"
                        onClick={() => onEdit(row.id)}
                        className="bg-amber-600 hover:bg-amber-700 text-white text-xs px-2 cursor-pointer rounded flex items-center gap-1"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="sm"
                        onClick={() => onDelete(row.id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs px-2 cursor-pointer rounded flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
