import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value !== 'string') {
            return new BadRequestException('Value is not a string')
        };

        if (value.length < 2) {
            throw new BadRequestException('Validation Failed');
        };

        return value;
    };
};