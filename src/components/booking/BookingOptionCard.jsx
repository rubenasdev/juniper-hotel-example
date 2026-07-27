export function BookingOptionCard({ item, selected, priceLabel, suffix, showStatus = false, onPreview, onPreviewEnd, onSelect }) {
  return <button
    type="button"
    className={selected ? 'selected' : ''}
    onMouseEnter={() => onPreview(item)}
    onMouseLeave={onPreviewEnd}
    onFocus={() => onPreview(item)}
    onBlur={onPreviewEnd}
    onClick={() => onSelect(item)}
    aria-pressed={selected}
  >
    <span><b>{item.name}</b><small>{item.meta}</small></span>
    <em><small>{priceLabel}</small>{item.price}{suffix ? <i>{suffix}</i> : null}</em>
    {showStatus ? <i>{selected ? '✓' : '+'}</i> : null}
  </button>;
}
