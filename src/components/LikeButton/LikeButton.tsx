import type { JSX, MouseEvent } from 'react';
import { Heart } from 'lucide-react';
import { useLikeItem, useUnlikeItem } from '../../hooks/items/useItems';

interface LikeButtonProperties {
  inventoryId: string;
  itemId: string;
  isLiked: boolean;
  likesCount: number;
  size?: 'sm' | 'md' | 'lg';
  onClick?: (event: MouseEvent) => void;
}

export const LikeButton = ({
  inventoryId,
  itemId,
  isLiked,
  likesCount,
  size = 'sm',
  onClick,
}: LikeButtonProperties): JSX.Element => {
  const likeMutation = useLikeItem();
  const unlikeMutation = useUnlikeItem();

  const handleClick = async (event: MouseEvent): Promise<void> => {
    event.stopPropagation();
    onClick?.(event);

    const identifiers = { inventoryId, itemId };

    await (isLiked
      ? unlikeMutation.mutateAsync(identifiers)
      : likeMutation.mutateAsync(identifiers));
  };

  const isPending = likeMutation.isPending || unlikeMutation.isPending;

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <button
      type="button"
      onClick={(event): void => {
        void handleClick(event);
      }}
      disabled={isPending}
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-800 ${
        isLiked ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
      }`}
      title={isLiked ? 'Unlike' : 'Like'}
    >
      <Heart className={`${sizeClasses[size]} ${isLiked ? 'fill-current' : ''}`} />
      <span className={`font-medium ${textSizeClasses[size]}`}>{likesCount}</span>
    </button>
  );
};
