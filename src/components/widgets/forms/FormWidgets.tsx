import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface FormFieldProps {
  label: string;
  value: string | number;
  type?: 'text' | 'number' | 'email' | 'date' | 'select';
  placeholder?: string;
  options?: { label: string; value: string }[];
  onChange?: (value: string | number) => void;
  required?: boolean;
}

export function FormField({ label, value, type = 'text', placeholder, options, onChange, required }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-gray-800">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {type === 'select' ? (
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
          placeholder={placeholder}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      )}
    </div>
  );
}

interface FormWidgetProps {
  title: string;
  fields: FormFieldProps[];
  onSubmit?: () => void;
  submitLabel?: string;
}

export function FormWidget({ title, fields, onSubmit, submitLabel = 'Save' }: FormWidgetProps) {
  return (
    <motion.div
      className="backdrop-blur-md bg-white/60 border border-white/40 rounded-2xl p-6 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {fields.map((field, idx) => (
          <FormField key={idx} {...field} />
        ))}
      </div>
      <Button
        onClick={onSubmit}
        className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg cursor-pointer w-full flex items-center justify-center gap-2"
      >
        {submitLabel}
      </Button>
    </motion.div>
  );
}

interface AddNewItemProps {
  title: string;
  fields: FormFieldProps[];
  onAdd?: () => void;
  addLabel?: string;
}

export function AddNewItemWidget({ title, fields, onAdd, addLabel = 'Add Item' }: AddNewItemProps) {
  return (
    <motion.div
      className="backdrop-blur-sm bg-white/40 border border-white/40 rounded-2xl p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h4 className="font-bold text-gray-900 mb-4">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {fields.map((field, idx) => (
          <FormField key={idx} {...field} />
        ))}
      </div>
      <Button
        onClick={onAdd}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg"
      >
        <Plus className="h-4 w-4" /> {addLabel}
      </Button>
    </motion.div>
  );
}
