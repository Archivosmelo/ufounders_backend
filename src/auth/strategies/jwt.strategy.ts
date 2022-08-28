import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt'
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt.payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectModel(User.name)
        private readonly usertModel: Model<User>,

        configService: ConfigService
    ) {
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: JwtPayload): Promise<User> {

        const { id } = payload

        const user = await this.usertModel.findById(id)

        // This validation runs on AuthGuards() because of the passport strategy
        if (!user) throw new UnauthorizedException("Token not valid")

        return user;

    }

}