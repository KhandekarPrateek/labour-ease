export default function Register() {
  return (
    <div>
      <h1>Register</h1>
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
        <button type="submit">Register</button>
      </form>
      <a href="/">Go to Home</a>
      <br />
      <a href="/login">Login</a>
    </div>
  );
}
