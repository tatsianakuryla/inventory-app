import type { JSX, MouseEvent } from 'react';
import { Heart } from 'lucide-react';
import { useLikeItem, useUnlikeItem } from '../../hooks/items/useItems';
import { getTailWindClass } from '../../shared/helpers/helpers';
import {
  baseButton,
  likedColor,
  unlikedColor,
  iconSizeClasses,
  textSizeClasses,
  fillCurrent,
  fontMedium,
  type LikeButtonSize,
} from './like-button.styles';

interface LikeButtonProperties {
  inventoryId: string;
  itemId: string;
  isLiked: boolean;
  likesCount: number;
  size?: LikeButtonSize;
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

  return (
    <button
      type="button"
      onClick={(event): void => {
        void handleClick(event);
      }}
      disabled={isPending}
      className={getTailWindClass(baseButton, isLiked ? likedColor : unlikedColor)}
      title={isLiked ? 'Unlike' : 'Like'}
    >
      <Heart className={getTailWindClass(iconSizeClasses[size], isLiked && fillCurrent)} />
      <span className={getTailWindClass(fontMedium, textSizeClasses[size])}>{likesCount}</span>
    </button>
  );
};
