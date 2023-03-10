import { prisma } from "./prisma.server";
import type { Prisma } from "@prisma/client";

export const addBookToFavourites = async (userId: string, bookId: string) => {
  const previousFavourites = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select:{
      favourites: true
    }
  });
  return await prisma.user.update({
    data: {
      favourites: {
        set: [...previousFavourites?.favourites!, {bookId}, ],
      },
    },
    where: {
      id: userId,
    },
  });
};
