"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
} from "@nextui-org/react";
import BuyMeCoffee from "./BuyMeCoffee";

export default function Nav() {
  return (
    <Navbar>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className=" font-bold text-white">OTTO TODOLIST</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <BuyMeCoffee />
      </NavbarContent>
    </Navbar>
  );
}
