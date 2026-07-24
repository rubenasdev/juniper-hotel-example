export const BREAKPOINTS = Object.freeze({
  compact: 360,
  mobile: 480,
  tablet: 768,
  laptop: 1024,
  desktop: 1280,
  wide: 1440,
});

export const MEDIA = Object.freeze({
  compact: `(max-width: ${BREAKPOINTS.compact - 1}px)`,
  mobile: `(min-width: ${BREAKPOINTS.compact}px) and (max-width: ${BREAKPOINTS.tablet - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.laptop - 1}px)`,
  laptopUp: `(min-width: ${BREAKPOINTS.laptop}px)`,
  heroMobileMotion: `(max-width: ${BREAKPOINTS.tablet - 1}px) and (prefers-reduced-motion: no-preference)`,
  heroDesktopMotion: `(min-width: ${BREAKPOINTS.tablet}px) and (prefers-reduced-motion: no-preference)`,
  horizontalRooms: '(prefers-reduced-motion: no-preference)',
  roomsNative: '(prefers-reduced-motion: reduce)',
  touch: '(hover: none), (pointer: coarse)',
  reducedMotion: '(prefers-reduced-motion: reduce)',
});
