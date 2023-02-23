import type { ActionFunction,  LoaderFunction, } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { FormField } from "~/components/form-field";
import { Layout } from "~/components/layout";
import { getUser, login } from "~/utils/auth.server";
import { register } from "~/utils/auth.server";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "~/utils/validators.server";

export const loader: LoaderFunction = async ({ request }) => {
  return (await getUser(request)) ? redirect("/") : null;
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  let confirmPassword = form.get("confirmPassword");
  let firstName = form.get("firstName");
  let lastName = form.get("lastName");

  if (
    typeof action !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 418 });
  }
  if (
    action === "register" &&
    (typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof confirmPassword !== "string")
  ) {
    return json({ error: `Invalid Form Data`, form: action }, { status: 418});
  }

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
    ...(action === "register"
      ? {
          firstName: validateName((firstName as string) || ""),
          lastName: validateName((lastName as string) || ""),
          confirmPassword: validateConfirmPassword(
            confirmPassword as string,
            password as string
          ),
        }
      : {}),
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json(
        {
          errors,
          fields: { email, password, confirmPassword, firstName, lastName },
          form: action,
        },
        { status: 418 }
      )
  }

  switch (action) {
    case "login": {
      return await login({ email, password });
    }
    case "register": {
      firstName = firstName as string;
      lastName = lastName as string;
      confirmPassword = confirmPassword as string;
      return await register({
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
      });
    }
    default:
      return json({ error: `Invalid Form Data` }, { status: 418 });
  }
};

export default function Login() {
  const actionData = useActionData();

  const firstLoad = useRef(true);
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState({email: "", password: "", confirmPassword: "", firstName: "", lastName: ""});
  const [action, setAction] = useState("login");
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
    confirmPassword: actionData?.fields?.confirmPassword || "",
    firstName: actionData?.fields?.lastName || "",
    lastName: actionData?.fields?.firstName || "",
  });


  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({
      ...form,
      [field]: event.target.value,
    }));
  };
  useEffect(() => {
    if (!firstLoad.current) {
      const newState = {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
      };
      setErrors(newState);
      setFormError("");
      setFormData(newState);
    }
  }, [action]);

  useEffect(()=> {
    setFormError(actionData?.error);
    setErrors(actionData?.errors);
  }, [actionData])

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("");
    }
  }, [formData]);

  useEffect(() => {
    firstLoad.current = false;
  }, []);

  return (
    <Layout>
      <div className="h-full flex justify-center items-center flex-col gap-y-4">
        <button
          onClick={() => setAction(action == "login" ? "register" : "login")}
          className="absolute top-8 right-8 rounded-xl bg-purple text-white font-semibold px-3 py-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-darkPurple"
        >
          {action === "login" ? "Sign Up" : "Sign In"}
        </button>
        <h2 className="text-5xl font-extrabold text-jet">Login</h2>
        <p className="font-semibold text-jet">
          {action === "login" ? "Log In To Begin!" : "Sign Up To Get Started!"}
        </p>

        <Form method="post" className="rounded-2xl bg-seaFoam p-6 w-96">
          <div className="text-xs font-semibold text-center tracking-wide text-jet w-full">
            {formError}
          </div>
          <FormField
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleInputChange(e, "email")}
            error={errors?.email || ""}
          />
          <FormField
            htmlFor="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange(e, "password")}
            error={errors?.password}
          />

          {action !== "login" ? (
            <>
              <FormField
                htmlFor="confirmPassword"
                label="Confirm password"
                value={formData.confirmPassword}
                type="password"
                onChange={(e) => handleInputChange(e, "confirmPassword")}
                error={actionData?.errors.confirmPassword}
              />
              <FormField
                htmlFor="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange(e, "firstName")}
                error={actionData?.errors.firstName}
              />
              <FormField
                htmlFor="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange(e, "lastName")}
                error={actionData?.errors.lastName}
              />
            </>
          ) : null}

          <div className="w-full text-center">
            <button
              name="_action"
              value={action}
              type="submit"
              className="rounded-xl mt-2 bg-purple text-white px-3 py-2 font-semibold transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-darkPurple"
            >
              {action === "login" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
}
