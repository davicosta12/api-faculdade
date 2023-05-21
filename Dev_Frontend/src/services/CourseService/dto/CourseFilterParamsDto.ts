export default class CourseFilterParamsDto {
    constructor(
      public serial: string = '',
      public name: string = '',
      public priceExact: number | null = null,
      public priceDe: number | null = null,
      public priceAte: number | null = null,
      public nextClassroomStartDateExact: Date | null = null,
      public nextClassroomStartDateDe: Date | null = null,
      public nextClassroomStartDateAte: Date | null = null,
      public isAdvancedSearch: boolean | undefined = undefined,
      public termsInput: string | null = null,
    ) { }
  }
  