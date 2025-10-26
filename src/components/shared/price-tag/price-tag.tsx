interface PriceTagProps {
  value: number;
  currency: string;
}

const PriceTag = ({ value, currency }: PriceTagProps) => {
  let symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : currency;
  return (
    <span className="text-blue-600 font-bold text-lg">
      {symbol} {value.toFixed(2)}
    </span>
  );
};

export default PriceTag;
