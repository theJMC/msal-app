
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom';
// import { useEffect, useState } from 'react';

import { useGlobalState } from '../globalState'; 
// import { getEmail } from "../user"
// import { checkIsAuth } from '../auth'
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal} from '@azure/msal-react';
import { loginRequest } from '../authConfig';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function LoginButton() {
  const { instance } = useMsal();
  return ( 
    <button 
      onClick={() => instance.loginRedirect(loginRequest)}
      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm p-2.5 text-center me-2"
    >
      Login
    </button>
  )
}

function ProfileButton() {
  const { instance } = useMsal();
  return (
    <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton 
            // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm p-2.5 text-center me-2"
          >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
              
          </MenuButton>
        </div>
        <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <MenuItem>
            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">Profile</a>
          </MenuItem>
        <MenuItem
          onClick={() => instance.logoutRedirect(logoutRequest)}>
            <a href="/logout" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
              Log Out
            </a>
        </MenuItem>
        </MenuItems>
    </Menu>
  )

function ProfileDropdown() {
  const {instance} = useMsal();
  const logoutRequest = {
    postLogoutRedirectUri: "http://localhost:3000"
  }
  return (
    <>
      <UnauthenticatedTemplate>
        <LoginButton />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <ProfileButton />
      </AuthenticatedTemplate>
    
    </>
  )
}


export default function NavBar() {
  const [globalState, ] = useGlobalState()
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <a href="/"><p className="px-2 text-white font-bold">{globalState.meta.title}</p></a>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    exact="true"
                    to={item.href}
                    key={item.name}
                    className={({ isActive }) => 
                        [
                            isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                        ].join(" ")
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Profile dropdown */}
            <ProfileDropdown />
            
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(
                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
