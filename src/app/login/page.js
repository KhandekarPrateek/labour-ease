export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <a href="/">Go to Home</a>
      <br />
      <a href="/register">Register</a>
    </div>
  );
}
