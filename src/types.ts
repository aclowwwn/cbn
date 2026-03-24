
export interface InterestAnswers {
  mentors: string;
  family: string;
  friends: string;
  school: string;
  church: string;
  location: string;
  opportunities: string;
  talents: string;
}

export interface SpiritualGiftsAnswers {
  [key: number]: number; // 1 to 75
}

export interface PersonalStyleAnswers {
  organize: number[]; // 7 values (1-5)
  energize: number[]; // 7 values (1-5)
}

export interface PassionAnswers {
  pastProblems: string;
  objectives: string;
  endOfLife: string;
  forOthers: string;
  peopleToHelp: string;
  causes: string;
  positiveExperiences: string;
  calling: string;
}

export interface OpportunitiesAnswers {
  personalProblems: string;
  personalOpportunities: string;
  familyProblems: string;
  familyOpportunities: string;
  friendsProblems: string;
  friendsOpportunities: string;
  churchProblems: string;
  churchOpportunities: string;
  communityProblems: string;
  communityOpportunities: string;
  equipmentNeeded: string;
}

export interface SpiritualExperienceAnswers {
  savedFrom: string;
  notYetLord: string;
  guiltPaid: string;
  painRemoved: string;
  burdensTaken: string;
  discouragementToCourage: string;
  sufferingAlleviated: string;
  savedFor: string;
  generalExperiences: string;
  howExperiencesHelp: string;
}

export interface AppData {
  interests: InterestAnswers;
  spiritualGifts: SpiritualGiftsAnswers;
  personalStyle: PersonalStyleAnswers;
  passion: PassionAnswers;
  opportunities: OpportunitiesAnswers;
  spiritualExperience: SpiritualExperienceAnswers;
  currentStep: number;
}
