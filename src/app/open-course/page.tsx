import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/app/open-course/search-bar";
import { getCourses } from "@/services/open-course";
import { Subject } from "@/types/subject";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

const coursesExamples: Subject[] = [
  {
    id: 1,
    name: "fewtwrg",
    schedule: [],
    professorId: 5,
    courseId: 4,
    academicLevel: "Undergraduate",
    isActive: true,
  },
  {
    id: 2,
    name: "yehhehy",
    schedule: [],
    professorId: 5,
    courseId: 4,
    academicLevel: "Undergraduate",
    isActive: true,
  },
  {
    id: 3,
    name: "frewrfew",
    schedule: [],
    professorId: 5,
    courseId: 4,
    academicLevel: "Undergraduate",
    isActive: true,
  },
];

// const getCoursesList = async () => {
//   const courses = await getCourses({
//     page: 0,
//     size: 10,
//     direction: "ASC",
//     sort: "id",
//     filters: [],
//   });
//   if (courses.content) {
//     return courses.content;
//   } else {
//     return [];
//   }
// };

export default async function Home() {
  // const courses = await getCoursesList();
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-4">
        <SearchBar subjects={coursesExamples} />
        <span>or</span>
        <Link href={"/open-course/courses-list"}>
          <Button>Explore</Button>
        </Link>
      </div>
      <div>
        <h1 className="text-xl">Discover courses</h1>
        <Carousel className="w-full max-w-screen-xl">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/3 lg:basis-1/5"
              >
                <div className="p-1">
                  <Card>
                    <Link href="/">
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-2xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div>
        <h1 className="text-xl">Most recent</h1>
        <Carousel className="w-full max-w-screen-xl">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/3 lg:basis-1/5"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-2">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div>
        <h1 className="text-xl">Most popular</h1>
        <Carousel className="w-full max-w-screen-xl">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/3 lg:basis-1/5"
              >
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div>
        <h1 className="text-xl">OC News</h1>
        <Card className="h-[500px] w-full">
          <CardContent className="grid gap-4"></CardContent>
        </Card>
      </div>
    </div>
  );
}
