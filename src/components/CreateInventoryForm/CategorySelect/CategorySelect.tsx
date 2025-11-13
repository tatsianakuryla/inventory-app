import { type JSX, useState, useRef, useEffect } from 'react';
import { useGetCategoryItemsQuantity } from '../../../hooks/categories/useCategories';
import { ChevronDown } from 'lucide-react';
import type { CategoryWithCount } from '../../../api/CategoryService/category.schemas';
import { getTailWindClass } from '../../../shared/helpers/helpers';
import * as styles from './category-select.styles';

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
    <div className={styles.container} ref={dropdownReference}>
      <button
        type="button"
        onClick={handleToggleDropdown}
        disabled={disabled || categoriesLoading}
        className={styles.button}
      >
        <span className={selectedCategory ? '' : styles.buttonTextPlaceholder}>
          {selectedCategory
            ? `${selectedCategory.name} (${selectedCategory.inventoriesCount})`
            : 'No category (optional)'}
        </span>
        <ChevronDown className={getTailWindClass(styles.chevron, isOpen && styles.chevronOpen)} />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.searchWrapper}>
            <input
              ref={inputReference}
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search categories..."
              className={styles.searchInput}
            />
          </div>

          <div className={styles.optionsList}>
            {searchTerm === '' && (
              <button
                type="button"
                onClick={() => handleSelectCategory()}
                className={styles.optionNone}
              >
                No category (optional)
              </button>
            )}

            {filteredCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleSelectCategory(category)}
                className={getTailWindClass(
                  styles.optionButton,
                  value === category.id ? styles.optionSelected : styles.optionNormal
                )}
              >
                {category.name} ({category.inventoriesCount})
              </button>
            ))}

            {filteredCategories.length === 0 && searchTerm !== '' && (
              <div className={styles.noResults}>No categories found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
