"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prisma } from "@prisma/client";
import { Scrollbar } from "@radix-ui/react-scroll-area";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Products from "./products";

interface RestaurantCategoriesProps {
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            menuCategories: {
                include: { products: true }
            }
        }
    }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
    include: { products: true }
}>

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectCategory] = useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0])

    const handleCategoryClick = (category: MenuCategoriesWithProducts) => {
        setSelectCategory(category)
    }

    const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
        return selectedCategory.id === category.id ? "default" : "secondary"
    }

    return (
        <div className="relative z-50 mt-[-1.5rem] rounded-t-3xl border bg-white">
            <div className="p-5">
                <div className="flex items-center gap-3">
                    <Image src={restaurant.avatarImageUrl} alt={restaurant.name} height={45} width={45} />
                    <div>
                        <h2 className="text-lg font-semibold">{restaurant.name}</h2>
                        <p className="text-xs opacity-55">{restaurant.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-green-500 mt-3">
                    <ClockIcon size={22} />
                    <p>Aberto!</p>
                </div>
            </div>

            <ScrollArea className="w-full">
                <div className="flex w-max space-x-4 p-5 pt-0">
                    {restaurant.menuCategories.map(category => (
                        <Button onClick={() => handleCategoryClick(category)} key={category.id} variant={getCategoryButtonVariant(category)} size="lg" className="rounded-full">
                            {category.name}
                        </Button>
                    ))}
                </div>
                <Scrollbar orientation="horizontal" />
            </ScrollArea>

            <h3 className="px-5 pt-8 font-semibold">{selectedCategory.name}</h3>
            <Products products={selectedCategory.products} />
        </div>
    );
}

export default RestaurantCategories;