import { skillResponseModel } from "./projectResponseModel";

export interface projectRequestModel {
     projectName : string;
     description : string;
     imageUrl: string;
     skills : skillResponseModel[];
     projectLink : string;
  }
  