export default function LoginBackground() {
  return (
    <div
      className="hidden md:block absolute inset-0 bg-center bg-cover"
      style={{ backgroundImage: "url('/login_background.webp')" }}
    >
      <div className="absolute inset-0 bg-white opacity-40"></div>
    </div>
  );
}
