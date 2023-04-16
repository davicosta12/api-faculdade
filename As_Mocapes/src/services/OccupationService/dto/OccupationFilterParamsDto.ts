export default class OccupationFilterParamsDto {
    constructor(
      public teacherName: string = '',
      public courseName: string = '',
      public weekDayAbbrev: string = '',
      public startTimeMinutes: number | null = null,
      public endTimeMinutes: number | null = null,
      
      public isAdvancedSearch: boolean | undefined = undefined,
      public termsInput: string | null = null,
      public fieldOrderLabel: string = '',
      public isDesc: boolean | null = null,
    ) { }
  }
  