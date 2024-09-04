import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FilterCommand } from "@/components/OpenCurse/FilterCommand";
import { getFaculties } from "@/services/faculty";
import { getSubjects } from "@/services/subject";
import { CourseCard } from "@/components/cards/course-card";

const getFacultiesList = async () => {
  const response = await getFaculties({
    page: 0,
    size: 100,
    direction: "ASC",
    sort: "id",
    filters: [],
  });

  return response.content.map((faculty) => {
    return faculty.name;
  });
};

const getSubjectsList = async () => {
  const response = await getSubjects({
    page: 0,
    size: 100,
    direction: "ASC",
    sort: "id",
    filters: [],
  });

  if (response.success) {
    return response.content;
  } else {
    return [];
  }
};

export default async function Home() {
  const subjectsData = getSubjectsList();
  const facultiesData = getFacultiesList();
  const [subjects, faculties] = await Promise.all([
    subjectsData,
    facultiesData,
  ]);

  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="col-span-2">
        <div className="flex flex-col">
          <h1>Filter</h1>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Faculties</AccordionTrigger>
              <AccordionContent>
                <FilterCommand items={faculties} />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Level</AccordionTrigger>
              <AccordionContent>
                <FilterCommand
                  items={[
                    "Undergraduate",
                    "Graduate",
                    "Non-Credit",
                    "High School",
                  ]}
                />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Topics</AccordionTrigger>
              <AccordionContent>
                {/*<FilterCommand items={} />*/}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="col-span-4">
        {subjects.map((subject) => {
          return <CourseCard subject={subject} />;
        })}
      </div>
    </div>
  );
}
