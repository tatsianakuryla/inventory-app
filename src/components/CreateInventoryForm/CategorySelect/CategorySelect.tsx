import { type JSX, useState, useRef, useEffect } from 'react';
import { useGetCategoryItemsQuantity } from '../../../hooks/categories/useCategories';
import { ChevronDown } from 'lucide-react';
import type { CategoryWithCount } from '../../../api/CategoryService/category.schemas';

interface CategorySelectProperties {
  value: number | undefined;
  onChange: (categoryId: number | undefined) => void;
  disabled?: boolean;
}

export const CategorySelect = ({
  value,
  onChange,
  disabled,
}: CategorySelectProperties): JSX.Element => {
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoryItemsQuantity();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownReference = useRef<HTMLDivElement>(null);
  const inputReference = useRef<HTMLInputElement>(null);

  const categories = categoriesData?.items || [];
  const selectedCategory = categories.find((category) => category.id === value);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (dropdownReference.current && !dropdownReference.current.contains(target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelectCategory = (category?: CategoryWithCount): void => {
    onChange(category?.id);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggleDropdown = (): void => {
    if (!disabled && !categoriesLoading) {
      setIsOpen(!isOpen);
      if (!isOpen) {
        setTimeout(() => inputReference.current?.focus(), 0);
      }
    }
  };

  return (
    <div className="relative w-full" ref={dropdownReference}>
      <button
        type="button"
        onClick={handleToggleDropdown}
        disabled={disabled || categoriesLoading}
        className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-left text-gray-900 shadow-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        <span className={selectedCategory ? '' : 'text-gray-400 dark:text-gray-500'}>
          {selectedCategory
            ? `${selectedCategory.name} (${selectedCategory.inventoriesCount})`
            : 'No category (optional)'}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform dark:text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
          <div className="border-b border-gray-200 p-2 dark:border-gray-700">
            <input
              ref={inputReference}
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-emerald-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="max-h-60 overflow-y-auto p-1">
            {searchTerm === '' && (
              <button
                type="button"
                onClick={() => handleSelectCategory()}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-400 transition-colors hover:bg-gray-100 dark:text-gray-500 dark:hover:bg-gray-800"
              >
                No category (optional)
              </button>
            )}

            {filteredCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleSelectCategory(category)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  value === category.id
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400'
                    : 'text-gray-900 dark:text-gray-100'
                }`}
              >
                {category.name} ({category.inventoriesCount})
              </button>
            ))}

            {filteredCategories.length === 0 && searchTerm !== '' && (
              <div className="px-3 py-2 text-sm text-gray-400 dark:text-gray-500">
                No categories found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
