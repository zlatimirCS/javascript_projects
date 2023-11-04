"use client";
import { useState, useEffect } from "react";
import { getProviders, signIn } from "next-auth/react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);
  console.log("providers", providers);
  if (providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, i) => {
          return <button key={i}>{provider.id}</button>;
        })}
      </div>
    );
  }
};
export default AuthProviders;
