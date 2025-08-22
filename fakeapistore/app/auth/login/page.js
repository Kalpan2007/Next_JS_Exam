export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-sky-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:border-sky-400"
          />
          <button className="w-full bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
