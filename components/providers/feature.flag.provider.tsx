"use client";
import { ReactNode, useRef } from "react";
import { IState } from "@flagsmith/flagsmith/types";
import { createFlagsmithInstance } from "@flagsmith/flagsmith/isomorphic";
import { FlagsmithProvider } from "@flagsmith/flagsmith/react";

export default function FeatureFlagProvider({
  serverState,
  children,
}: {
  serverState: IState;
  children: ReactNode;
}) {
  const flagsmithInstance = useRef(createFlagsmithInstance());
  return (
    <FlagsmithProvider
      flagsmith={flagsmithInstance.current}
      serverState={serverState}
    >
      {children}
    </FlagsmithProvider>
  );
}
