import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipeUser implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const { metatype } = metadata;
        if (!metadata || !this.toValidate(metatype)) {
            return value;
        };

        const obj = plainToClass(metatype, value);
        const err = await validate(obj);
        if (err.length > 0) {
            throw new BadRequestException('Validation failed');
        };
        return value;
    };
    
    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    };
};
