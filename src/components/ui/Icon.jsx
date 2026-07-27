const paths = {
  right: 'M5 12h14m-5-5 5 5-5 5',
  left: 'M19 12H5m5 5-5-5 5-5',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  calendar: 'M5 4v3m14-3v3M4 9h16v11H4z',
  down: 'm7 10 5 5 5-5',
  pin: 'M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0zm-8-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  bed: 'M3 18v-7h18v7M5 11V6h6v5m0 0V7h6a2 2 0 0 1 2 2v2M3 15h18M5 18v3m14-3v3',
  users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8m13 10v-2a4 4 0 0 0-3-3.87m-2-11.96a4 4 0 0 1 0 7.75',
  expand: 'M8 3H3v5m13-5h5v5M8 21H3v-5m13 5h5v-5M3 8l6-5m12 5-6-5M3 16l6 5m12-5-6 5',
  bath: 'M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Zm3 0V6a3 3 0 0 1 6 0v1m-7 12-1 2m13-2 1 2',
  star: 'm12 3 2.7 5.47 6.03.88-4.36 4.25 1.03 6-5.39-2.83L6.97 18.6 8 12.6 3.64 8.35l6.03-.88L12 3Z',
  home: 'M3 10.5 12 3l9 7.5V21H3V10.5Zm5 10v-7h8v7',
  terrace: 'M3 13h18M5 13V8h14v5M7 8V5h10v3M6 13v7m12-7v7',
  coffee: 'M4 8h12v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Zm12 2h2a3 3 0 0 1 0 6h-3M6 4h8',
  wifi: 'M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 20h.01',
  snow: 'M12 2v20M4.2 6.5l15.6 11M19.8 6.5l-15.6 11M9 3.8l3 2 3-2M9 20.2l3-2 3 2',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Zm-3-10 2 2 4-4',
};

export function Icon({ name, size = 20, ...props }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]}/></svg>;
}
