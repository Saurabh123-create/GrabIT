import React, { useState, useEffect, useContext } from "react";
import Header from "../Header";
import { Context } from "../../Store";
export default function Products() {
  const { search } = useContext(Context);
  return (
    <>
      <Header />
      <h1>This is a Product Page</h1>
      <h1>This is a Search text : {search}</h1>
    </>
  );
}
