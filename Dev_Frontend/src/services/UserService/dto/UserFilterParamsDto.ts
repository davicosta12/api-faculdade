export default class UserFilterParamsDto {
    constructor(
      public perfil: string = '',
      public userName: string = '',
      public studantRa: string = '',
      public gender: string = '',
      public motherName: string = '',
      public isActive: boolean | undefined = undefined,
      public isAdvancedSearch: boolean | undefined = undefined,
      public termsInput: string | null = null,
      public fieldOrderLabel: string = '',
      public isDesc: boolean | null = null,
    ) { }
  }