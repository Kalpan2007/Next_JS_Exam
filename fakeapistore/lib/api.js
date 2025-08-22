const API_BASE = "https://fakestoreapi.com";

export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  return res.json();
}

export async function getCarts() {
  const res = await fetch(`${API_BASE}/carts`);
  return res.json();
}

export async function getCart(id) {
  const res = await fetch(`${API_BASE}/carts/${id}`);
  return res.json();
}

export async function getUsers() {
  const res = await fetch(`${API_BASE}/users`);
  return res.json();
}

export async function getUser(id) {
  const res = await fetch(`${API_BASE}/users/${id}`);
  return res.json();
}
