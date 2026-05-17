const heights = [12, 18, 24, 20, 31, 35, 28, 38];

type CheckoutMeterProps = {
  /** Which bars use brand color (last N bars) */
  accentFrom?: number;
};

export function CheckoutMeter({ accentFrom = 6 }: CheckoutMeterProps) {
  return (
    <div className="mt-5 flex h-[42px] items-end gap-[5px]" aria-hidden>
      {heights.map((height, index) => (
        <span
          key={index}
          className="block min-w-[6px] flex-1 rounded-t-full rounded-b-[2px]"
          style={{
            height: `${height}px`,
            background:
              index >= accentFrom - 1 ? "var(--color-brand)" : "#2b2b31",
          }}
        />
      ))}
    </div>
  );
}
