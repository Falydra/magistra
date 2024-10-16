import { Link } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import {
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
} from "@radix-ui/react-navigation-menu";
import { NavigationMenu, NavigationMenuList } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import React from "react";
// import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
// import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Navbar() {
    const components: { title: string; href: string; description: string }[] = [
        {
            title: "Kompetisi",
            href: "/kompetisi",
            description:
                "Kompetisi di bidang akademik yang diikuti oleh siswa SMA/sederajat.",
        },
        {
            title: "LKTI",
            href: "/lkti",
            description:
                "Wadah peserta untuk menuangkan ide dan berinovasi dalam bentuk Karya Tulis Ilmiah.",
        },
        {
            title: "Artchemist",
            href: "/artchemist",
            description:
                "Kompetisi kreatif yang berbentuk poster atau videografi dengan ide terkait.",
        },
        {
            title: "Seminar",
            href: "/seminar",
            description: "Seminar nasional membahas isu-isu kimia yang sedang hangat dibicarakan.",
        },
    ];

    const ListItem = React.forwardRef<
        React.ElementRef<"a">,
        React.ComponentPropsWithoutRef<"a">
    >(({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <a
                        ref={ref}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">
                            {title}
                        </div>
                        <p className="text-sm leading-snug line-clamp-2 text-muted-foreground">
                            {children}
                        </p>
                    </a>
                </NavigationMenuLink>
            </li>
        );
    });
    ListItem.displayName = "ListItem";

    return (
        <nav className="fixed top-0 z-50 flex justify-between w-full bg-dcf-dark-500 min-h-16 sm:min-h-10">
            <div className="flex justify-between w-full px-5 sm:py-2 h-1/12 lg:py-4 ">
                <div className="flex items-start justify-center">
                    <a href={route('home')}>
                        <img
                            src="/images/DCF.png"
                            className="w-auto h-12"
                        ></img>
                    </a>
                </div>
                <div className="flex items-center justify-between text-center sm:justify-center ">
                    <ul className="sm:flex gap-12 text-[16px]  text-dcf-orange-300 items-center text-center">
                        <li className="hidden lg:flex">
                            <a href={route('home')}>Home</a>
                        </li>
                        <li className="hidden lg:flex">
                            <a href="#about">About</a>
                        </li>

                        <NavigationMenu className="hidden lg:flex">
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>
                                        Event
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        
                                        <div className="flex w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[360px] flex-col justify-left">
                                            {components.map((component) => (
                                                <ListItem
                                                    key={component.title}
                                                    title={component.title}
                                                    href={component.href}
                                                >
                                                    {component.description}
                                                </ListItem>
                                            ))}
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <li className="hidden lg:flex">
                            <a href="#timeline">Timeline</a>
                        </li>
                        <li className="sm:flex">
                            <Link href={route("login")}>
                                <Button
                                    variant={"secondary"}
                                    color="black"
                                    className="flex items-center justify-center w-32 h-10 rounded-full bg-dcf-orange-300 text-dcf-dark-500"
                                >
                                    Login
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </div>
                
            </div>
        </nav>
    );
}