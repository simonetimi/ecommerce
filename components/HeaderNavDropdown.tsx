'use client';

import {
  Bars3Icon,
  BuildingStorefrontIcon,
  HomeIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';

const HeaderNavDropdown = () => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" isIconOnly>
          <Bars3Icon aria-label="Action" className="h-6 w-6" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Navigation bar">
        <DropdownItem
          key="home"
          startContent={<HomeIcon className="mb-0.5 h-5 w-5" />}
          href="/"
        >
          Home
        </DropdownItem>
        <DropdownItem
          key="products"
          startContent={<BuildingStorefrontIcon className="mb-0.5 h-5 w-5" />}
          href="/products"
        >
          Products
        </DropdownItem>
        <DropdownItem
          key="orders"
          startContent={<ShoppingBagIcon className="mb-0.5 h-5 w-5" />}
          href="/orders"
        >
          My orders
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default HeaderNavDropdown;
