/* 
BaseTemplate.jsx - 12/19/2025 -> Create a base template/page to render above every other page
*/

import React from "react";
import { Outlet } from "react-router-dom";

export default function BaseTemplate({ children }) {
  return (
    <>

      {/* Main Content*/}
      <main style={{ marginTop: "70px", marginBottom: "60px" }}>
        {children || <Outlet />}
      </main>

      {/* Bottom Bar */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100vw",
          height: "60px",
          background: "rgba(17, 17, 17, 0.95)",
          color: "#aaa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Real economic World Bank data | AI-powered investment insights | Updated for 2025
      </footer>
    </>
  );
}