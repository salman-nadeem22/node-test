/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, PipeTransform, ArgumentMetadata, UnprocessableEntityException } from '@nestjs/common';
import { classToPlain, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) throw new UnprocessableEntityException(await this.formatErrors(errors));

    return classToPlain(object);
  }
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private async formatErrors(validationErrors: ValidationError[]): Promise<any> {
    const errors = {};

    validationErrors.forEach((error) => {
      if (!error.children || !error.children.length) errors[error.property] = { errors: Object.values(error.constraints) };
      else errors[error.property] = this.formatErrors(error.children);
    });

    return [errors];
  }
}
