import ProgramForm from "@/app/(home)/programs/details/[id]/form";
import { getPrograms } from "@/services/program";
import { Program } from "@/types/program";

const ProgramDetails = async (props: { params: { id: string } }) => {
  const { id } = props.params;
  const programResponse = await getPrograms({
    direction: "ASC",
    page: 0,
    size: 1,
    sort: "id",
    filters: [
      {
        attribute: "id",
        value: +id,
      },
    ],
  });

  if (!programResponse.success) {
    throw new Error(programResponse.message);
  }

  return (
    <ProgramForm program={programResponse.content?.content[0] as Program} />
  );
};

export default ProgramDetails;
