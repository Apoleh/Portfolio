export interface skillResponseModel {
    skillId: string;
    skillName: string;
  }
  



export interface projectResponseModel {
    projectId: string;
     projectName : string;
     description : string;
     imageUrl: string;
     skills : skillResponseModel[];
     projectLink : string;
  }
  