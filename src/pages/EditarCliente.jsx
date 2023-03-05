import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import { getClient, actualizarCliente } from "../data/clientes";
import Error from "../components/Error";

export async function loader({ params }) {
  const cliente = await getClient(params.id);
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No se encontraron resultados",
    });
  }
  return cliente;
}

export async function action({request, params}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const email = formData.get('email')
  //**********        Validacion
  const errors = [];
  if (Object.values(data).includes("")) {
    errors.push("Todos los campos son obligatorios");
  }

  // expresion regular
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if(!regex.test(email )){
    errors.push("Email no valido")
  }

  //retornar datos y errores
  if (Object.keys(errors).length) {
    return errors;
  }

  // Actualizar el cliente
  await actualizarCliente(params.id, data)
  return redirect('/')

}
const EditarCliente = () => {
    const navigate = useNavigate();
    const cliente = useLoaderData();
    const errors = useActionData();
    
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Modifica los datos</p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10">
        {errors?.length &&
          errors.map((error, inx) => <Error key={inx}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario cliente = {cliente} />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:cursor-pointer"
            value="Actualizar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default EditarCliente;
