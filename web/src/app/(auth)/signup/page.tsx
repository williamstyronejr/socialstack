import SocialAuth from "../_components/SocialAuth";

export default function Signup() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-64 h-64 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Signup</h1>
        <form>
          <SocialAuth text="Signup" />

          <div className="flex flex-col gap-2">
            <hr />
            <p>Or</p>
            <hr />
          </div>

          <div className="flex flex-col gap-2">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </div>
        </form>
      </div>
    </div>
  );
}
