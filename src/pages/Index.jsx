import Cliente from "../components/Cliente";
import { useLoaderData } from "react-router-dom";
import { getClients } from "../data/clientes";

export function loader() {
  const clientes = getClients();
  return clientes;
}

const Index = () => {
  const clientes = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3"> Administra tus clientes</p>

      {clientes.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Clientes</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <Cliente cliente={cliente} key={cliente.id} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="py-5 text-center text-2xl">No hay clientes aun</p>
      )}
    </>
  );
};

export default Index;
