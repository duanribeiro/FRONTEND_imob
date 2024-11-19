interface LogoProps {
  isTextHidden?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ isTextHidden }) => (
  <svg
    className="mr-1 stroke-current stroke-2 text-black"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="black"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="40"
    height="40"
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <line x1="5" y1="12" x2="19" y2="12" />
    <line x1="12" y1="3" x2="12" y2="5" />
    <line x1="12" y1="5" x2="12" y2="21" />
    <line x1="3" y1="12" x2="20" y2="12" />
  </svg>
);
