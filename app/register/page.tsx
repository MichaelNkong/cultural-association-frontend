export default function Register() {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Register</h1>
        <form className="mt-4 space-y-4">
          <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
          <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">Register</button>
        </form>
      </div>
    );
  }