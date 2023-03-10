export default class CourseFilterParamsDto {
    constructor(
      public courseName: string = '',
      public semesterLimitQtdeType: string = '',
      public semesterLimitQtdeDe: number | null = null,
      public semesterLimitQtdeAte: number | null = null,
      public fieldOrderLabel: string = '',
      public isDesc: boolean | null = null,
    ) { }
  }
  