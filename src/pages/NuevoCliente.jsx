import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { addClient } from "../data/clientes";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const email = formData.get("email");
  //console.log(formData.get('nombre'));
  //console.log([...formData]);

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

  // Agregar cliente 
  await addClient(data)
  return redirect('/')
}

const NuevoCliente = () => {
  const errors = useActionData();
  const navigate = useNavigate();
  console.log(errors);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Crear Nuevo Cliente</h1>
      <p className="mt-3">Llena los datos para crear nuevo cliente</p>
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
          <Formulario />

          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg hover:cursor-pointer"
            value="Registrar Cliente"
          />
        </Form>
      </div>
    </>
  );
};

export default NuevoCliente;
