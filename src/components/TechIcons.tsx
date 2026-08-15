import React from "react";

export interface IconProps {
  className?: string;
  size?: number;
}

// 1. Python Icon
export function PythonIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path
        d="M11.914 2C9.28 2 7.6 2.682 7.6 4.387V6.44h4.429v.684H5.214C3.12 7.124 2 8.784 2 11.238c0 2.453 1.12 4.113 3.214 4.113H7.6v-2.054c0-1.705 1.68-2.387 4.314-2.387h4.428V8.496c0-1.705-1.68-2.387-4.314-2.387h-1.12V2h1zm-2.214 1.368a.855.855 0 110 1.71.855.855 0 010-1.71z"
        fill="#387EB8"
      />
      <path
        d="M12.086 22c2.634 0 4.314-.682 4.314-2.387V17.56h-4.429v-.684h6.815c2.094 0 3.214-1.66 3.214-4.113 0-2.453-1.12-4.113-3.214-4.113H16.4v2.054c0 1.705-1.68 2.387-4.314 2.387H7.657v2.414c0 1.705 1.68 2.387 4.314 2.387h1.12V22h-1zm2.214-1.368a.855.855 0 110-1.71.855.855 0 010 1.71z"
        fill="#FFE052"
      />
    </svg>
  );
}

// 2. NumPy Icon
export function NumpyIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#013243" />
      <path d="M5 8L12 4L19 8L12 12L5 8Z" fill="#4DABCF" />
      <path d="M5 8L12 12V20L5 16V8Z" fill="#01506D" />
      <path d="M12 12L19 8V16L12 20V12Z" fill="#2582A5" />
      <path
        d="M8.5 7.5L8.5 16.5L11 16.5L11 11.5L13.5 16.5L15.5 16.5L15.5 7.5L13 7.5L13 12.5L10.5 7.5L8.5 7.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 3. Pandas Icon
export function PandasIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#150458" />
      <rect x="4" y="5" width="3.5" height="14" rx="1.5" fill="#E70488" />
      <rect x="9" y="8" width="3.5" height="11" rx="1.5" fill="#FFD13B" />
      <rect x="14" y="5" width="3.5" height="8" rx="1.5" fill="#00A3E0" />
      <rect x="14" y="14" width="3.5" height="5" rx="1.5" fill="#FFFFFF" />
      <circle cx="18" cy="18.5" r="1.5" fill="#E70488" />
    </svg>
  );
}

// 4. Node.js Icon
export function NodejsIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z" fill="#333333" />
      <path d="M12 3.5L19.5 7.8V16.2L12 20.5L4.5 16.2V7.8L12 3.5Z" fill="#5FA04E" />
      <path
        d="M12 6.5C8.96 6.5 6.5 8.96 6.5 12C6.5 15.04 8.96 17.5 12 17.5C13.8 17.5 15.4 16.63 16.4 15.3L14.7 14.1C14.1 15 13.1 15.5 12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.1 8.5 14.1 9 14.7 9.9L16.4 8.7C15.4 7.37 13.8 6.5 12 6.5Z"
        fill="#FFFFFF"
      />
      <path d="M16 11H18V16H16V11Z" fill="#FFFFFF" />
      <circle cx="17" cy="9" r="1" fill="#FFFFFF" />
    </svg>
  );
}

// 5. React Icon
export function ReactIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="3.8"
        stroke="#61DAFB"
        strokeWidth="1.3"
        transform="rotate(0 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="3.8"
        stroke="#61DAFB"
        strokeWidth="1.3"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="3.8"
        stroke="#61DAFB"
        strokeWidth="1.3"
        transform="rotate(120 12 12)"
      />
    </svg>
  );
}

// 6. Express Icon
export function ExpressIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#18181B" stroke="#38BDF8" strokeWidth="0.8" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fill="#38BDF8"
        fontFamily="ui-monospace, monospace"
        fontWeight="800"
        fontSize="11"
        letterSpacing="-0.5px"
      >
        ex
      </text>
    </svg>
  );
}

// 7. Java Icon
export function JavaIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path
        d="M9.5 17.5C9.5 17.5 7.5 18 6 18.5C3.5 19.3 8 20.5 12 20.5C16 20.5 20.5 19.3 18 18.5C16.5 18 14.5 17.5 14.5 17.5"
        stroke="#5382A1"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 15C8 15 6.5 15.5 5.5 16C3.5 17 8 18 12 18C16 18 20.5 17 18.5 16C17.5 15.5 16 15 16 15"
        stroke="#E76F00"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 3C8.5 5 13.5 7 11 10M14 2C12.5 4.5 17.5 6.5 15 9.5M8 6C6.5 8 10 9.5 9 12"
        stroke="#ED8B00"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M7 12C7 13.5 9.2 14.5 12 14.5C14.8 14.5 17 13.5 17 12"
        stroke="#5382A1"
        strokeWidth="1.5"
      />
    </svg>
  );
}

// 8. JavaScript Icon
export function JavascriptIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="4" fill="#F7DF1E" />
      <path
        d="M7 17.5L8.8 16.3C9.3 17.1 9.9 17.7 10.9 17.7C11.8 17.7 12.3 17.2 12.3 16.2V10.5H14.4V16.3C14.4 18.5 13.1 19.5 11.2 19.5C9.5 19.5 8.1 18.6 7 17.5ZM15.1 17.3L16.9 16.2C17.5 17 18.3 17.7 19.4 17.7C20.3 17.7 20.9 17.2 20.9 16.5C20.9 15.7 20.3 15.4 19.1 14.8L18.4 14.5C16.7 13.8 15.6 12.9 15.6 11.1C15.6 9.3 17 8 18.9 8C20.4 8 21.4 8.7 22.1 9.9L20.4 11C19.9 10.3 19.4 9.9 18.8 9.9C18.1 9.9 17.6 10.3 17.6 11C17.6 11.7 18.1 12 19.2 12.5L19.8 12.8C21.7 13.6 22.8 14.5 22.8 16.4C22.8 18.6 21.1 19.5 19 19.5C17.1 19.5 15.8 18.6 15.1 17.3Z"
        fill="#000000"
      />
    </svg>
  );
}

// 9. TypeScript Icon
export function TypescriptIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        d="M6 10H13V12H10.7V19H8.3V12H6V10ZM13.8 17.3L15.6 16.2C16.2 17.1 17 17.7 18.1 17.7C19 17.7 19.6 17.2 19.6 16.4C19.6 15.6 19 15.3 17.8 14.8L17.2 14.5C15.5 13.8 14.4 12.9 14.4 11.1C14.4 9.3 15.8 8 17.8 8C19.3 8 20.4 8.7 21.1 9.9L19.4 11C18.9 10.3 18.4 9.9 17.7 9.9C17 9.9 16.5 10.3 16.5 11C16.5 11.7 17 12 18.1 12.5L18.7 12.8C20.6 13.6 21.7 14.5 21.7 16.4C21.7 18.5 20.1 19.5 18 19.5C16 19.5 14.6 18.6 13.8 17.3Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 10. Tailwind CSS Icon
export function TailwindIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.975 12 6.001 12z"
        fill="#38BDF8"
      />
    </svg>
  );
}

// 11. HTML5 Icon
export function Html5Icon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path d="M3 2L5 20L12 22L19 20L21 2H3Z" fill="#E34F26" />
      <path d="M12 3.8V20.2L17.5 18.7L19.2 3.8H12Z" fill="#EF652A" />
      <path
        d="M7.8 7.5H16.2L15.9 10.5H12V12.5H15.7L15.2 16.3L12 17.2V19.2L16.9 17.8L17.7 7.5H6.3"
        fill="#FFFFFF"
        opacity="0.95"
      />
    </svg>
  );
}

// 12. CSS3 Icon
export function Css3Icon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path d="M3 2L5 20L12 22L19 20L21 2H3Z" fill="#1572B6" />
      <path d="M12 3.8V20.2L17.5 18.7L19.2 3.8H12Z" fill="#33A9DC" />
      <path
        d="M16.2 7.5H7.8L8.1 10.5H12V12.5H8.3L8.8 16.3L12 17.2V19.2L7.1 17.8L6.3 7.5H17.7"
        fill="#FFFFFF"
        opacity="0.95"
      />
    </svg>
  );
}

// 13. MySQL Icon
export function MysqlIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#00618A" />
      <path
        d="M12 4C7.5 4 4 6.2 4 9V15C4 17.8 7.5 20 12 20C16.5 20 20 17.8 20 15V9C20 6.2 16.5 4 12 4Z"
        fill="#00758F"
        opacity="0.3"
      />
      <path
        d="M12 6C15.8 6 18.5 7.3 18.5 9C18.5 10.7 15.8 12 12 12C8.2 12 5.5 10.7 5.5 9C5.5 7.3 8.2 6 12 6Z"
        stroke="#E48E00"
        strokeWidth="1.4"
      />
      <path
        d="M5.5 12C5.5 13.7 8.2 15 12 15C15.8 15 18.5 13.7 18.5 12"
        stroke="#F29111"
        strokeWidth="1.4"
      />
      <path
        d="M5.5 15C5.5 16.7 8.2 18 12 18C15.8 18 18.5 16.7 18.5 15"
        stroke="#FFFFFF"
        strokeWidth="1.4"
      />
    </svg>
  );
}

// 14. Git Icon
export function GitIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path
        d="M21.6 10.6L13.4 2.4C12.9 1.9 12.1 1.9 11.6 2.4L9.8 4.2L12.4 6.8C13 6.6 13.8 6.8 14.3 7.3C14.8 7.8 15 8.6 14.8 9.2L17.3 11.7C17.9 11.5 18.7 11.7 19.2 12.2C19.9 12.9 19.9 14.1 19.2 14.8C18.5 15.5 17.3 15.5 16.6 14.8C16.1 14.3 15.9 13.5 16.1 12.9L13.8 10.6V15.7C14 16 14.1 16.4 14 16.8C13.8 17.7 13.1 18.4 12.2 18.5C11.1 18.7 10.1 17.8 10.1 16.7C10.1 16 10.5 15.4 11 15.1V9.9C10.5 9.6 10.1 9 10.1 8.3C10.1 7.6 10.5 7 11 6.7L8.4 4.1L2.4 10.1C1.9 10.6 1.9 11.4 2.4 11.9L10.6 20.1C11.1 20.6 11.9 20.6 12.4 20.1L21.6 10.9C22.1 10.5 22.1 9.7 21.6 10.6Z"
        fill="#F05032"
      />
    </svg>
  );
}

// 15. GitHub Icon
export function GithubIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#24292E" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 4C7.58 4 4 7.58 4 12C4 15.54 6.29 18.53 9.47 19.59C9.87 19.66 10.02 19.42 10.02 19.21C10.02 19.02 10.01 18.39 10.01 17.72C8 18.09 7.45 17.21 7.29 16.76C7.2 16.53 6.82 15.84 6.48 15.65C6.2 15.5 5.8 15.13 6.47 15.12C7.1 15.11 7.55 15.7 7.7 15.94C8.42 17.16 9.58 16.82 9.97 16.64C10.04 16.12 10.25 15.77 10.48 15.57C8.69 15.37 6.81 14.68 6.81 11.6C6.81 10.72 7.12 10 7.64 9.44C7.56 9.24 7.28 8.41 7.72 7.31C7.72 7.31 8.39 7.1 9.93 8.14C10.57 7.96 11.26 7.87 11.95 7.87C12.64 7.87 13.33 7.96 13.97 8.14C15.51 7.09 16.18 7.31 16.18 7.31C16.62 8.41 16.34 9.24 16.26 9.44C16.78 10 17.09 10.71 17.09 11.6C17.09 14.69 15.2 15.37 13.41 15.57C13.7 15.82 13.95 16.3 13.95 17.06C13.95 18.15 13.94 19.03 13.94 19.21C13.94 19.42 14.09 19.67 14.49 19.59C17.67 18.53 19.96 15.53 19.96 12C19.96 7.58 16.38 4 12 4Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 16. VS Code Icon
export function VscodeIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#1E1E1E" />
      <path d="M17.5 2.5L7.5 9.5L13.5 14L17.5 11V2.5Z" fill="#0065A9" />
      <path d="M17.5 21.5L7.5 14.5L13.5 10L17.5 13V21.5Z" fill="#007ACC" />
      <path d="M17.5 2.5L13.5 6L17.5 10V2.5Z" fill="#1F8AD2" />
      <path d="M17.5 21.5L13.5 18L17.5 14V21.5Z" fill="#1F8AD2" />
      <path d="M2.5 12L6.5 8.5L7.5 9.5L4.5 12L7.5 14.5L6.5 15.5L2.5 12Z" fill="#007ACC" />
      <path d="M17.5 2.5L21.5 4.5V19.5L17.5 21.5V2.5Z" fill="#007ACC" />
    </svg>
  );
}

// 17. IntelliJ IDEA Icon
export function IntellijIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#000000" />
      <path d="M3 17.5L5.5 6.5L15 3.5L21 9.5L18.5 19.5L7.5 21.5L3 17.5Z" fill="url(#ij-grad)" />
      <rect x="5" y="5" width="14" height="14" rx="2" fill="#000000" />
      <text x="7" y="15" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="8">IJ</text>
      <rect x="7" y="16" width="6" height="1.5" fill="#38BDF8" />
      <defs>
        <linearGradient id="ij-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FE2857" />
          <stop offset="50%" stopColor="#FB8817" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 18. Vite Icon
export function ViteIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path d="M19.5 4.5L12.5 21L4.5 4.5H19.5Z" fill="url(#vite-grad)" />
      <path d="M13 3L7.5 13H12L11 20L17.5 9.5H13L14 3H13Z" fill="#FFD427" />
      <defs>
        <linearGradient id="vite-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#41D1FF" />
          <stop offset="100%" stopColor="#BD34FE" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 19. API / Async Fetch Pipeline Icon
export function ApiIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#0A0F24" stroke="#38BDF8" strokeWidth="0.8" />
      <path d="M5 12H19M19 12L14 7M19 12L14 17" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7" cy="12" r="2" fill="#22D3EE" />
    </svg>
  );
}

// 20. Algorithms & Data Structures Icon
export function AlgoIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#111827" stroke="#818CF8" strokeWidth="0.8" />
      <circle cx="12" cy="6" r="2.2" fill="#818CF8" />
      <circle cx="6" cy="17" r="2.2" fill="#38BDF8" />
      <circle cx="18" cy="17" r="2.2" fill="#38BDF8" />
      <path d="M11 7.5L7 15.5M13 7.5L17 15.5" stroke="#94A3B8" strokeWidth="1.4" />
    </svg>
  );
}

// 21. C Language & Systems Icon
export function CIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" fill="#00599C" />
      <path d="M12 3.5L19.5 7.8V16.2L12 20.5L4.5 16.2V7.8L12 3.5Z" fill="#004482" />
      <path
        d="M15.5 9.2C14.7 8.4 13.5 8 12.1 8C9.5 8 7.5 9.8 7.5 12C7.5 14.2 9.5 16 12.1 16C13.5 16 14.7 15.6 15.5 14.8"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 22. AI & ML Pipelines Icon
export function AiIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#1E1B4B" stroke="#A855F7" strokeWidth="0.8" />
      <path d="M12 3V6M12 18V21M3 12H6M18 12H21" stroke="#C084FC" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="4.5" stroke="#A855F7" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2" fill="#E879F9" />
    </svg>
  );
}

// 23. Large Language Models (LLMs) Icon
export function LlmIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#030712" stroke="#38BDF8" strokeWidth="0.8" />
      <path d="M12 4L13.8 9.5L19.5 11.3L13.8 13.1L12 18.6L10.2 13.1L4.5 11.3L10.2 9.5L12 4Z" fill="url(#sparkle-grad)" />
      <circle cx="18" cy="6" r="1.5" fill="#67E8F9" />
      <defs>
        <linearGradient id="sparkle-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// 24. RAG Info Retrievers Icon
export function RagIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#0F172A" stroke="#10B981" strokeWidth="0.8" />
      <path d="M6 8C6 6.9 8.7 6 12 6C15.3 6 18 6.9 18 8M6 12C6 13.1 8.7 14 12 14C15.3 14 18 13.1 18 12M6 16C6 17.1 8.7 18 12 18C15.3 18 18 17.1 18 16" stroke="#34D399" strokeWidth="1.4" />
      <circle cx="15.5" cy="14.5" r="3.5" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
      <path d="M18 17L20.5 19.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 25. MongoDB Icon
export function MongodbIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#02341D" stroke="#00ED64" strokeWidth="0.8" />
      <path
        d="M12.001 2.5C11.58 3.02 8 8.1 8 13.06C8 17.06 10.02 19.98 12.001 21.5C13.98 19.98 16 17.06 16 13.06C16 8.1 12.42 3.02 12.001 2.5Z"
        fill="#00ED64"
      />
      <path
        d="M12 2.5V21.5C12 21.5 15.9 17.06 15.9 13.06C15.9 8.1 12 2.5 12 2.5Z"
        fill="#00684A"
      />
      <path
        d="M11.95 21.5V13.8L12.05 13.8V21.5H11.95Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

// 26. OpenCV / Computer Vision Icon
export function OpencvIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#0D1117" stroke="#38BDF8" strokeWidth="0.8" />
      <circle cx="12" cy="7" r="3.5" stroke="#FF4081" strokeWidth="1.5" />
      <circle cx="7" cy="16" r="3.5" stroke="#00E676" strokeWidth="1.5" />
      <circle cx="17" cy="16" r="3.5" stroke="#2979FF" strokeWidth="1.5" />
      <circle cx="12" cy="7" r="1.2" fill="#FF4081" />
      <circle cx="7" cy="16" r="1.2" fill="#00E676" />
      <circle cx="17" cy="16" r="1.2" fill="#2979FF" />
    </svg>
  );
}

// 27. Network / Packet Analyzer Icon
export function NetworkIcon({ className = "w-8 h-8", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <rect width="24" height="24" rx="5" fill="#030712" stroke="#A855F7" strokeWidth="0.8" />
      <rect x="4" y="4" width="6" height="5" rx="1" stroke="#A855F7" strokeWidth="1.2" fill="#1E1B4B" />
      <rect x="14" y="4" width="6" height="5" rx="1" stroke="#38BDF8" strokeWidth="1.2" fill="#0C4A6E" />
      <rect x="9" y="15" width="6" height="5" rx="1" stroke="#34D399" strokeWidth="1.2" fill="#064E3B" />
      <path d="M7 9V12H17V9M12 12V15" stroke="#94A3B8" strokeWidth="1.2" />
    </svg>
  );
}

// Comprehensive Icon resolver helper matching names to SVG components
export function getTechIcon(name: string, className = "w-8 h-8") {
  const lower = name.toLowerCase();
  if (lower.includes("mongo")) return <MongodbIcon className={className} />;
  if (lower.includes("opencv") || lower.includes("vision") || lower.includes("face recognition")) return <OpencvIcon className={className} />;
  if (lower.includes("packet") || lower.includes("network") || lower.includes("cyber") || lower.includes("traffic")) return <NetworkIcon className={className} />;
  if (lower.includes("python")) return <PythonIcon className={className} />;
  if (lower.includes("numpy")) return <NumpyIcon className={className} />;
  if (lower.includes("pandas")) return <PandasIcon className={className} />;
  if (lower.includes("node")) return <NodejsIcon className={className} />;
  if (lower.includes("react")) return <ReactIcon className={className} />;
  if (lower.includes("express")) return <ExpressIcon className={className} />;
  if (lower.includes("java") && !lower.includes("script")) return <JavaIcon className={className} />;
  if (lower.includes("typescript")) return <TypescriptIcon className={className} />;
  if (lower.includes("javascript") || lower.includes("es6")) return <JavascriptIcon className={className} />;
  if (lower.includes("tailwind")) return <TailwindIcon className={className} />;
  if (lower.includes("html") || lower.includes("canvas")) return <Html5Icon className={className} />;
  if (lower.includes("css") || lower.includes("grid")) return <Css3Icon className={className} />;
  if (lower.includes("mysql") || lower.includes("sql") || lower.includes("database")) return <MysqlIcon className={className} />;
  if (lower.includes("github")) return <GithubIcon className={className} />;
  if (lower.includes("git")) return <GitIcon className={className} />;
  if (lower.includes("vscode") || lower.includes("vs code")) return <VscodeIcon className={className} />;
  if (lower.includes("intellij")) return <IntellijIcon className={className} />;
  if (lower.includes("vite")) return <ViteIcon className={className} />;
  if (lower.includes("async") || lower.includes("fetch") || lower.includes("api") || lower.includes("rest") || lower.includes("upi")) return <ApiIcon className={className} />;
  if (lower.includes("data structure") || lower.includes("algo")) return <AlgoIcon className={className} />;
  if (lower.includes(" c ") || lower.includes("c &") || lower.startsWith("c ") || lower.includes("system")) return <CIcon className={className} />;
  if (lower.includes("pipeline") || lower.includes("ai/ml") || lower.includes("machine learning") || lower.includes("scikit") || lower.includes("valuation")) return <AiIcon className={className} />;
  if (lower.includes("llm") || lower.includes("language model")) return <LlmIcon className={className} />;
  if (lower.includes("rag") || lower.includes("retriever")) return <RagIcon className={className} />;

  return null;
}
