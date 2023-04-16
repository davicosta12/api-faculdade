export default class UserFilterParamsDto {
    constructor(
      public name: string = '',
      public ra: string = '',
      // public semesterLimitQtdeExact: number | null = null,
      // public semesterLimitQtdeDe: number | null = null,
      // public semesterLimitQtdeAte: number | null = null,
      // public testDateExact: Date | null = null,
      // public testDateDe: Date | null = null,
      // public testDateAte: Date | null = null,
      public genderAbbrev: string | null = null,
      public motherName: string = '',
      public isActive: boolean | null = null,
      
      public isAdvancedSearch: boolean | undefined = undefined,
      public termsInput: string | null = null,
      public fieldOrderLabel: string = '',
      public isDesc: boolean | null = null,
    ) { }
  }
  