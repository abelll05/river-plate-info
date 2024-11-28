// src/components/Socios.js
import React from "react";

const Socios = () => {
  return (
    <div>
      <h1>Socios de River Plate</h1>

      {/* CATEGORÍAS */}
      <section>
        <h2>CATEGORÍAS</h2>
        <ul>
          <li>Infantil (hasta 6 inclusive)</li>
          <li>Menor Simple (de 7 a 17)</li>
          <li>Menor Pleno (de 7 a 17)</li>
          <li>Activo Simple (mayor de 18)</li>
          <li>Activo Pleno (mayor de 18)</li>
          <li>Adherente (no distingue edad)</li>
          <li>Internacional (no distingue edad)</li>
          <li>Somos River (no distingue edad)</li>
        </ul>
      </section>

      {/* IMPORTANTE */}
      <section>
        <h2>IMPORTANTE</h2>
        <p>
          1. Actualmente las categorías habilitadas para inscripciones son:
          Infantil, Menor Simple, Menor Pleno, Activo Simple, Activo Pleno,
          Internacional y Comunidad Somos River.
        </p>
        <p>
          2. Los Socios Infantiles, al cumplir 7 años, pasan automáticamente a
          la categoría Menor Pleno, sin excepción.
        </p>
      </section>

      {/* BENEFICIOS Y ALCANCE */}
      <section>
        <h2>BENEFICIOS Y ALCANCE</h2>
        
        <h3>Simple</h3>
        <p>
          Acceso a la compra de entradas por partido con prioridad y abonos de
          TLM durante la venta de remanentes, ingresar al Club y disfrutar de
          beneficios y descuentos en los comercios adheridos.
        </p>

        <h3>Pleno</h3>
        <p>
          Acceso a la compra de entradas por partido con prioridad y abonos de
          TLM durante la venta de remanentes. Además, podrá disfrutar de la
          totalidad del Club, sus instalaciones y participar en las distintas
          actividades (abonando el arancel adicional en los casos que
          corresponda). También, gozar de los beneficios y descuentos en los
          comercios adheridos.
        </p>

        <h3>Internacional</h3>
        <p>
          Acceso a la compra de entradas por partido con prioridad, ingresar al
          Club y disfrutar de beneficios y descuentos en los comercios adheridos.
        </p>

        <h3>Comunidad Somos River</h3>
        <p>
          Podrá comprar entradas por partido con prioridad y acceder a los
          beneficios y descuentos en los comercios adheridos.
        </p>
      </section>
    </div>
  );
};

export default Socios;
