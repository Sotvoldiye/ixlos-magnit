// utils/dailyDealsFunction.js

const toDateOnly = (isoString) => {
    return new Date(isoString).toISOString().split("T")[0];
  };
  
  export default function getTop10DailyDeals(products) {
    if (!Array.isArray(products)) return [];
  
    const productsWithValidFields = products.filter(
      (p) => p.meta?.createdAt && typeof p.discountPercentage === "number"
    );
  
    if (!productsWithValidFields.length) return [];
  
    const latestDate = productsWithValidFields.reduce((latest, item) => {
      const itemDate = toDateOnly(item.meta.createdAt);
      return itemDate > latest ? itemDate : latest;
    }, toDateOnly(productsWithValidFields[0].meta.createdAt));
  
    const latestDayProducts = productsWithValidFields.filter(
      (p) => toDateOnly(p.meta.createdAt) === latestDate
    );
  
    if (!latestDayProducts.length) return [];
  
    return [...latestDayProducts]
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, 10);
  }
  
