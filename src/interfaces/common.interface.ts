import { Request } from "express";

export enum QuestionTypeEnum {
  TextInput = 'TEXT',
  Radio = 'RADIO',
  RatingScale = 'RATING',
  Checkbox = 'CHECKBOX',
  DropdownSelect = 'DROPDOWN',
}

export interface RequestAuth extends Request {
  user?: {
    userId: string;
  }
}