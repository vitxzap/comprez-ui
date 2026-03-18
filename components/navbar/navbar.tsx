"use client";

import { IconMenu2 } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { renderMobileMenuItem } from "./mobile";
import { renderMenuItem } from "./menus";
import { NavbarProps } from "./interfaces";
import { data } from "./data";
import { ToggleThemeButton } from "../ui/toggle-theme";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
const Navbar = ({
  menu = data.menu,
  logo = data.logo,
  auth = data.auth,
  className,
}: NavbarProps) => {
  return (
    <section className={cn("py-4 flex w-full justify-center", className)}>
      <div className="container">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <span className="text-lg font-semibold tracking-tighter">
              {logo!.title}
            </span>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <ToggleThemeButton />
                  {menu!.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex gap-2">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button variant="outline" size="sm">
                    {auth!.login.title}
                  </Button>
                }
              />
              <TooltipContent>This feature is current disabled</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={<Button size="sm">{auth!.signup.title}</Button>}
              />

              <TooltipContent>This feature is current disabled</TooltipContent>
            </Tooltip>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo!.url} className="flex items-center gap-2">
              <img
                src={logo!.src}
                className="max-h-8 dark:invert"
                alt={logo!.alt}
              />
            </a>
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="outline" size="icon">
                    <IconMenu2 className="size-4" />
                  </Button>
                }
              />
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo!.url} className="flex items-center gap-2">
                      <img
                        src={logo!.src}
                        className="max-h-8 dark:invert"
                        alt={logo!.alt}
                      />
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion className="flex w-full flex-col gap-4">
                    {menu!.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button
                      render={<a href={auth!.login.url}>{auth!.login.title}</a>}
                      variant="outline"
                      disabled
                    />

                    <Button
                      render={
                        <a href={auth!.signup.url}>{auth!.signup.title}</a>
                      }
                      disabled
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
