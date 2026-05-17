const heights = [12, 18, 24, 20, 31, 35, 28, 38];

type CheckoutMeterProps = {
  /** Which bars use brand color (last N bars) */
  accentFrom?: number;
};

export function CheckoutMeter({ accentFrom = 6 }: CheckoutMeterProps) {
  return (
    <div className="mt-5 flex h-[42px] items-end gap-[5px] overflow-hidden" aria-hidden>
      {heights.map((height, index) => (
        <span
          key={index}
          className={`checkout-meter-bar ${index >= accentFrom - 1 ? "checkout-meter-bar--accent" : ""}`}
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}
