const MOBILE_MAX = 767;
const TABLET_MAX = 1024;

export const MOBILE_SIZE = `(max-width: ${MOBILE_MAX}px)`;

export const TABLET_SIZE = `(min-width: ${MOBILE_MAX + 1}px) and (max-width: ${TABLET_MAX - 1}px)`;

export const DESKTOP_SIZE = `(min-width: ${TABLET_MAX}px)`;