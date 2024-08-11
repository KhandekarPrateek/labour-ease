import "./page.css";
export default function Login() {
  return (
    <div className="centered-container">
      <div className="form-wrapper">
        <h1 className="form-heading">Login</h1>
        <form>
          <div>
            <label className="form-label" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="form-button"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/"
            className="form-link"
          >
            Go to Home
          </a>
          <br />
          <a
            href="/register"
            className="form-link"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
