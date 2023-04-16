export default class UserFilterParamsDto {
    constructor(
      public name: string = '',
      public description: string = '',
      
      public isAdvancedSearch: boolean | undefined = undefined,
      public termsInput: string | null = null,
      public fieldOrderLabel: string = '',
      public isDesc: boolean | null = null,
    ) { }
  }
  