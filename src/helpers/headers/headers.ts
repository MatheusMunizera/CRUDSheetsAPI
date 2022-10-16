import { applyDecorators } from "@nestjs/common";
import { ApiHeader } from "@nestjs/swagger";

export function ApiHeaders() {
    return applyDecorators(
      ApiHeader({
        name: 'X-Identify-Sheet',
        description: "The id of your sheets (Api needs to have privileges on it)",
        example: '1PFCI_GqZ9p3aLPLwOA4oS55ylx-0g0wPDMEeDcrvtIk',
      }),
      ApiHeader({
        name: 'X-Name-Sheet',
        description: "The name page of your sheet",
        example: "CRUD",
      })
    );
  }
  