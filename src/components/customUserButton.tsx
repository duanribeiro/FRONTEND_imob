import { UserButton } from "@clerk/nextjs";

export function CustomUserButton() {
  return (
    <div
      style={{
        transition: "transform 0.2s ease",
        display: "inline-block",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: "30px",
              height: "30px",
            },
          },
        }}
      />
    </div>
  );
}
