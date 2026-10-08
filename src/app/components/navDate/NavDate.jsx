"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });
const getServerSnapshot = () => "";

const NavDate = () => {
  const date = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <p className="text-sm text-gray-500 font-medium">
      {date }
    </p>
  );
};

export default NavDate;