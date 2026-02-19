const ButterflyDecor = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 200 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Left wing */}
    <path
      d="M100 90 C70 30, 10 20, 20 70 C25 95, 60 100, 100 90Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.3"
    />
    <path
      d="M100 90 C75 50, 30 40, 35 75 C38 88, 65 93, 100 90Z"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.2"
    />
    {/* Right wing */}
    <path
      d="M100 90 C130 30, 190 20, 180 70 C175 95, 140 100, 100 90Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.3"
    />
    <path
      d="M100 90 C125 50, 170 40, 165 75 C162 88, 135 93, 100 90Z"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.2"
    />
    {/* Lower left wing */}
    <path
      d="M100 90 C65 110, 25 150, 55 140 C75 133, 90 110, 100 90Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.25"
    />
    {/* Lower right wing */}
    <path
      d="M100 90 C135 110, 175 150, 145 140 C125 133, 110 110, 100 90Z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.25"
    />
    {/* Body */}
    <path
      d="M100 60 L100 130"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.35"
    />
    {/* Antennae */}
    <path
      d="M100 65 C95 50, 85 40, 80 35"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.25"
    />
    <path
      d="M100 65 C105 50, 115 40, 120 35"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.25"
    />
  </svg>
);

export default ButterflyDecor;
