const URL = import.meta.env.VITE_API_URL;

export async function getClients() {
  const res = await fetch(`${URL}`);
  const result = await res.json();
  return result;
}

export async function getClient(id) {
  const res = await fetch(`${URL}/${id}`);
  const result = await res.json();
  return result;
}

export async function addClient(data) {
  try {
    const resp = await fetch(`${URL}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    await resp.json();
  } catch (error) {
    console.log(error);
  }
}

export async function actualizarCliente(id, data) {
  try {
    const resp = await fetch(`${URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    });
    await resp.json();
  } catch (error) {
    console.log(error);
  }
}

export async function eliminarCliente(id){
  try {
    const resp = await fetch(`${URL}/${id}`, {
      method: "DELETE",
    });
    await resp.json();
  } catch (error) {
    console.log(error);
  }
}