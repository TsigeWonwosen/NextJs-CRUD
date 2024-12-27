export async function fetchUsers() {
  try {
    const res = await fetch('http://localhost:3000/api/users');
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const users = await res.json();
    return users;
  } catch (error) {
    return error.message;
  }
}
