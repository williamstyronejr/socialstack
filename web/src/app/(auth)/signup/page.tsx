import EmailPassword from "../_components/EmailPassword";
import SocialAuth from "../_components/SocialAuth";

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-80 py-4 px-4 bg-white rounded-lg shadow-md border border-gray-300 space-y-4">
        <h1 className="text-2xl font-bold text-center">Signup</h1>

        <SocialAuth text="Sign Up" />

        <div className="flex flex-row gap-2 items-center">
          <hr className="flex-1 border-t border-gray-300" />
          <p className="text-gray-500">or</p>
          <hr className="flex-1 border-t border-gray-300" />
        </div>

        <EmailPassword type="signup" />
      </div>
    </div>
  );
}
