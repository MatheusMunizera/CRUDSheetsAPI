import { ParameterObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export interface ApiHeaderOptions extends Omit<ParameterObject, 'in'> {
    'X-Identify-Sheet' : string,
    'X-Name-Sheet' : string,
}