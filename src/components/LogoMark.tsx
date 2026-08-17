export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="9" fill="currentColor" className="text-teal" />
      <circle cx="11" cy="13" r="2.4" fill="#F4EFE6" />
      <circle cx="25" cy="11" r="2" fill="#8FCFC6" />
      <circle cx="18" cy="23" r="2.7" fill="#C48A52" />
      <path
        d="M11 13 L18 23 L25 11"
        stroke="#F4EFE6"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
