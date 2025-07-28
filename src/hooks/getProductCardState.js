// utils/getProductCardState.js

export function getProductCardState(item, favorites, bags, toggleFavorited, toggleBaged) {
    const isFavorited = favorites.includes(item.id);
    const isInBags = bags.includes(item.id);
  
    return {
      isFavorited,
      isInBags,
      toggleFavorited: () => toggleFavorited(item.id),
      toggleBaged: () => toggleBaged(item.id),
    };
  }
  