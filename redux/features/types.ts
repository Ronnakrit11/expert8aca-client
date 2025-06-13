// Common types for API endpoints

// Builder type for RTK Query
export type EndpointBuilder = any;

// Common parameter types
export interface IdParam {
  id: string;
}

export interface TypeParam {
  type: string;
}

export interface BodyParam {
  body: any;
}

export interface FileParam {
  file: File;
}

export interface AvatarParam {
  avatar: any;
}

export interface NameParam {
  name: string;
}

export interface IdNameParam {
  id: string;
  name: string;
}

export interface IdDataParam {
  id: string;
  data: any;
}

export interface CourseIdParam {
  courseId: string;
}

export interface EbookIdParam {
  ebookId: string;
}

export interface AmountParam {
  amount: number;
}

export interface QuizIdParam {
  quizId: string;
}

export interface QuizIdBodyParam {
  quizId: string;
  body: any;
}

export interface QuizCourseIdParam {
  quiz_id: string;
  course_id: string;
}

export interface CourseIdPaymentParam {
  courseId: string;
  payment_info: any;
}

export interface EbookIdPaymentParam {
  ebookId: string;
  payment_info: any;
  isFree?: boolean;
}

export interface UserPasswordParam {
  oldPassword: string;
  newPassword: string;
}

export interface UserRoleParam {
  email: string;
  role: string;
}

export interface UserCourseParam {
  user_id: string;
  course_id: string;
  expireDate: string;
}

export interface LayoutParam {
  type: string;
  image?: any;
  title?: string;
  subTitle?: string;
  faq?: any;
  categories?: any[];
  imageList?: any[];
}

// Middleware type
export interface GetDefaultMiddleware {
  (): any[];
}
