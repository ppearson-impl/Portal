interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md';
  dark?: boolean;
}

export function Avatar({ initials, size = 'md', dark = false }: AvatarProps) {
  const sizeClass = size === 'sm' ? 'w-7 h-7 text-[11px]' : 'w-9 h-9 text-sm';
  const colourClass = dark
    ? 'bg-[var(--canvas-licorice-600)] text-white'
    : 'bg-[var(--canvas-blueberry-400)] text-white';
  return (
    <span className={`inline-flex items-center justify-center rounded-full font-medium flex-shrink-0 ${sizeClass} ${colourClass}`}>
      {initials}
    </span>
  );
}
