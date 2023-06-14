import { AxiosResponse } from "axios";
import GenericPagingDto from "../GenericDto/GenericPagingDto";
import HttpService from "../HttpService";
import CourseFilterParamsDto from "./dto/CourseFilterParamsDto";
import GetCourseDto from "./dto/GetCourseDto";
import { getNullDateFromAPI, prepareDateToAPIUrl } from "../../misc/utils/utils";
import DetailedCourseDto from "./dto/DetailedCourseDto";
import { GenericResponseDto } from "../GenericDto/GenericResponseDto";
import PostCourseDto from "./dto/PostCourseDto";

export default class CourseService extends HttpService {

  getCourses(filterParams: CourseFilterParamsDto, alonePageSize: number = 50): Promise<GetCourseDto[]> {
    let query: string = '';

    if (filterParams?.serial) query += `serial=${encodeURI(filterParams.serial)}&`;
    if (filterParams?.name) query += `name=${encodeURI(filterParams.name)}&`;
    if (filterParams?.priceExact) query += `priceExact=${encodeURI(filterParams.priceExact + '')}&`;
    if (filterParams?.priceDe) query += `priceDe=${encodeURI(filterParams.priceDe + '')}&`;
    if (filterParams?.priceAte) query += `priceAte=${encodeURI(filterParams.priceAte + '')}&`;
    if (filterParams?.nextClassroomStartDateExact) query += `nextClassroomStartDateExact=${prepareDateToAPIUrl(filterParams.nextClassroomStartDateExact)}&`;
    if (filterParams?.nextClassroomStartDateDe) query += `nextClassroomStartDateDe=${prepareDateToAPIUrl(filterParams.nextClassroomStartDateDe)}&`;
    if (filterParams?.nextClassroomStartDateAte) query += `nextClassroomStartDateAte=${prepareDateToAPIUrl(filterParams.nextClassroomStartDateAte)}&`;
    if (filterParams?.termsInput) query += `termsInput=${encodeURI(filterParams.termsInput)}&`;
    if (filterParams?.isAdvancedSearch !== undefined) query += `isAdvancedSearch=${filterParams.isAdvancedSearch}&`;
    query += `alonePageSize=${alonePageSize}`;

    return new Promise((resolve, reject) => {
      this.getApi().get(`/Course?${query}`)
        .then(res => {
          const data = res.data as GetCourseDto[];
          data.forEach(x => x.dataInicioProximaTurma = getNullDateFromAPI(x.dataInicioProximaTurma));
          resolve(data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  getCourseById(id: number): Promise<DetailedCourseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().get(`/Course/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  createCourse(course: PostCourseDto): Promise<GenericResponseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().post(`/Course`, course)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  updateCourse(id: number, course: PostCourseDto): Promise<GenericResponseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().put(`/Course/${id}`, course)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }

  deleteCourse(id: number): Promise<GetCourseDto> {
    return new Promise((resolve, reject) => {
      this.getApi().delete(`/Course/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch((err: AxiosResponse<any>) => reject(err))
    })
  }
}