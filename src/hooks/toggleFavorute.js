import React from 'react'

export  const toggleHelp = (e) => {
     e.preventDefault();
     setHelpReport((prev) => !prev);
   };
 
export   const toggleFavorite = (e ,isFavorited) => {
     e.preventDefault();
     if (isFavorited) {
       dispatch(removeFavorute({ id: item.id }));
     } else {
       dispatch(addFavorute(item));
     }
   };


