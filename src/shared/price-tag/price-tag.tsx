interface IPriceTagProps {
  value: number;
  currency: string;
}

const PriceTag = ({ value, currency }: IPriceTagProps) => {
  let symbol = currency === "EUR" ? "€" : currency === "USD" ? "$" : currency;
  return (
    <span className="text-blue-600 font-bold text-lg">
      {symbol} {value.toFixed(2)}
    </span>
  );
};

export default PriceTag;
