"use client"
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/16/solid';

export default function Nav() {
  return (
    <Navbar className="bg-neutral-900" >
      <NavbarContent justify="center">
        <NavbarBrand className="mr-4">
          
          <p className=" font-bold text-white">OTTO TODOLIST</p>
        </NavbarBrand>
        
      </NavbarContent>

      {/* <NavbarContent as="div" className="items-center" justify="end"> */}
        {/* <Input
          classNames={{
            base: "max-w-full   h-10",
            mainWrapper: "h-full ",
            input: "text-small",
            inputWrapper: "h-full font-normal bg-neutral-950 rounded-lg text-default-500 ",
          }}
          placeholder="Type to search..."
          size="lg"
          startContent={<MagnifyingGlassIcon className="size-8 text-white" />}
          type="search"
        /> */}
        {/* <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      {/* </NavbarContent> */}
    </Navbar>
  )
}
